import { useState, useRef, useCallback } from 'react';

/**
 * 아이템의 위치 정보를 나타내는 인터페이스
 */
interface Position {
  x: number; // x 좌표
  y: number; // y 좌표
}

/**
 * 드래그 시작 시 마우스 클릭 지점과 아이템 위치의 차이를 저장하는 인터페이스
 * 이를 통해 드래그 중에도 마우스가 아이템의 정확한 위치에 유지됨
 */
interface DragOffset {
  x: number; // x축 오프셋
  y: number; // y축 오프셋
}

/**
 * useDragAndDrop 훅의 설정 옵션 인터페이스
 */
interface UseDragAndDropProps<T> {
  items: T[]; // 드래그 가능한 아이템들의 배열
  getItemId: (item: T) => number | string; // 아이템에서 고유 ID를 추출하는 함수
  getItemPosition: (item: T) => Position; // 아이템에서 현재 위치를 추출하는 함수
  onPositionChange: (items: T[]) => void; // 아이템 위치가 변경될 때 호출되는 콜백
}

/**
 * 드래그 앤 드롭 기능을 제공하는 커스텀 훅
 *
 * @template T - 드래그할 아이템의 타입
 * @param options - 드래그 앤 드롭 설정 옵션
 * @returns 드래그 앤 드롭 관련 상태와 핸들러들
 */
export const useDragAndDrop = <T>({
  items,
  getItemId,
  getItemPosition,
  onPositionChange,
}: UseDragAndDropProps<T>) => {
  // 현재 드래그 중인 아이템의 ID (null이면 드래그 중이 아님)
  const [draggedItemId, setDraggedItemId] = useState<number | string | null>(
    null
  );

  // 드래그 시작 시 마우스 클릭 지점과 아이템 위치의 차이
  const [dragOffset, setDragOffset] = useState<DragOffset>({ x: 0, y: 0 });

  // 현재 드래그 중인지 여부
  const [isDragging, setIsDragging] = useState(false);

  // 드래그 컨테이너의 DOM 참조
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * 드래그를 시작하는 함수
   * 마우스 클릭 시 호출되어 드래그 상태를 초기화하고 오프셋을 계산
   *
   * @param e - 마우스 이벤트
   * @param itemId - 드래그할 아이템의 ID
   */
  const startDrag = useCallback(
    (e: React.MouseEvent, itemId: number | string) => {
      // 드래그할 아이템을 배열에서 찾기
      const item = items.find(item => getItemId(item) === itemId);
      if (!item || !containerRef.current) return;

      // 컨테이너의 위치 정보 가져오기 (스크롤, 패딩 등 고려)
      const rect = containerRef.current.getBoundingClientRect();
      const position = getItemPosition(item);

      // 마우스 클릭 지점과 아이템 위치의 차이를 계산 (드래그 오프셋)
      // 이를 통해 드래그 중에도 마우스가 아이템의 정확한 위치에 유지됨
      const offsetX = e.clientX - rect.left - position.x;
      const offsetY = e.clientY - rect.top - position.y;

      // 드래그 상태 설정
      setDragOffset({ x: offsetX, y: offsetY });
      setDraggedItemId(itemId);
      setIsDragging(true);
    },
    [items, getItemId, getItemPosition]
  );

  /**
   * 드래그 중 아이템의 위치를 업데이트하는 함수
   * 마우스 이동 시 호출되어 드래그 중인 아이템의 위치를 실시간으로 변경
   *
   * @param e - 마우스 이벤트
   */
  const updatePosition = useCallback(
    (e: React.MouseEvent, callback: (item: T) => T) => {
      // 드래그 중이 아니거나 컨테이너가 없으면 무시
      if (draggedItemId === null || !containerRef.current) return;

      // requestAnimationFrame을 사용하여 부드러운 애니메이션 보장
      // 브라우저의 다음 리페인트 시점에 실행되어 성능 최적화
      requestAnimationFrame(async () => {
        // 컨테이너의 위치 정보 가져오기
        const rect = containerRef.current!.getBoundingClientRect();

        // 새로운 위치 계산: 마우스 위치 - 컨테이너 오프셋 - 드래그 오프셋
        const newX = e.clientX - rect.left - dragOffset.x;
        const newY = e.clientY - rect.top - dragOffset.y;

        // 아이템 배열에서 드래그 중인 아이템의 위치만 업데이트
        const updatedItems = items.map(item => {
          if (getItemId(item) === draggedItemId) {
            const updatedItem = callback(item);
            return {
              ...updatedItem,
              position: { x: newX, y: newY },
            };
          }
          return item; // 다른 아이템들은 그대로 유지
        });

        // 업데이트된 아이템 배열을 부모 컴포넌트에 전달
        onPositionChange(updatedItems);
      });
    },
    [draggedItemId, dragOffset, items, getItemId, onPositionChange]
  );

  /**
   * 드래그를 종료하는 함수
   * 마우스 버튼을 놓거나 컨테이너를 벗어날 때 호출되어 드래그 상태를 초기화
   */
  const endDrag = useCallback(() => {
    if (draggedItemId !== null) {
      // 드래그가 끝났을 때 마지막 위치로 업데이트
      // 현재 아이템 배열의 복사본을 전달하여 최종 상태 확정
      onPositionChange([...items]);
    }

    // 드래그 상태 초기화
    setDraggedItemId(null);
    setIsDragging(false);
  }, [draggedItemId, items, onPositionChange]);

  /**
   * 특정 아이템이 현재 드래그 중인지 확인하는 함수
   * UI에서 드래그 중인 아이템에 시각적 효과를 적용할 때 사용
   *
   * @param itemId - 확인할 아이템의 ID
   * @returns 해당 아이템이 드래그 중이면 true, 아니면 false
   */
  const isItemDragging = useCallback(
    (itemId: number | string) => draggedItemId === itemId,
    [draggedItemId]
  );

  // 훅에서 제공하는 값들을 반환
  return {
    containerRef, // 드래그 컨테이너의 DOM 참조
    isDragging, // 현재 드래그 중인지 여부
    startDrag, // 드래그 시작 함수
    updatePosition, // 위치 업데이트 함수
    endDrag, // 드래그 종료 함수
    isItemDragging, // 아이템 드래그 상태 확인 함수
  };
};
