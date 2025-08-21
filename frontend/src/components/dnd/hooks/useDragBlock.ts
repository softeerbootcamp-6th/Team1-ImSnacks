import { useState, useCallback, type RefObject } from 'react';
import type { WorkBlockType } from '@/types/workCard.type';
import type { Position } from '@/types/position.type';
import isInBound from '@/utils/isInBound';
import updateWorkTimeByPos from '@/pages/homePage/utils/work/updateWorkTimeByPos';
import { getYCoordinate } from '@/constants/workTimeCoordinate';
import { useBlocksTransition } from '@/components/dnd/hooks/useBlocksTransition';
import { getTimeUpdatedBlocks } from '@/pages/homePage/utils/work/updateBlockTime';
import { resolveCollision } from '@/components/dnd/utils/resolveCollision';
import updateBlockTimeOnServer from '@/pages/homePage/utils/work/updateBlockTimeOnServer';
import { useSetPointerEvents } from '@/hooks/useSetPointerEvents';

interface UseDragBlockProps {
  containerRef: RefObject<HTMLDivElement | null>;
  scrollOffset: number;
  workBlocks: WorkBlockType[];
  updateWorkBlocks: (blocks: WorkBlockType[]) => void;
}

export const useDragBlock = ({
  containerRef,
  scrollOffset,
  workBlocks,
  updateWorkBlocks,
}: UseDragBlockProps) => {
  const [draggingBlock, setDraggingBlock] = useState<WorkBlockType | null>(
    null
  );
  //렌더링 시에만 사용하는 위치, scrollOffset 보정 x
  const [pointerPosition, setPointerPosition] = useState<Position | null>(null);

  //마우스 위치와 블록 위치 차이
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });

  // 전이 애니메이션 훅 사용
  const { animateBlocksTransition } =
    useBlocksTransition<WorkBlockType>(updateWorkBlocks);

  const getContainerCoords = useCallback(
    (e: PointerEvent) => {
      if (!containerRef.current) return { x: 0, y: 0 };
      const rect = containerRef.current.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    },
    [containerRef]
  );

  const handleStartDrag = useCallback(
    (e: PointerEvent, block: WorkBlockType) => {
      const containerCoords = getContainerCoords(e);
      const rect = containerRef.current?.getBoundingClientRect();

      setDragOffset({
        x: e.clientX - (rect?.left ?? 0) + scrollOffset - block.position.x,
        y: e.clientY - (rect?.top ?? 0) - block.position.y,
      });

      setDraggingBlock(block);
      setPointerPosition(containerCoords);
    },
    [containerRef, getContainerCoords, scrollOffset]
  );

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (!draggingBlock) return;

      const containerCoords = getContainerCoords(e);
      setPointerPosition(containerCoords);

      const newPosition = {
        x: containerCoords.x + scrollOffset - dragOffset.x,
        y: containerCoords.y - dragOffset.y,
      };

      const { newStartTime, newEndTime, newWorkTime } = updateWorkTimeByPos(
        draggingBlock.startTime,
        draggingBlock.endTime,
        newPosition
      );

      setDraggingBlock({
        ...draggingBlock,
        position: newPosition,
        startTime: newStartTime,
        endTime: newEndTime,
        workTime: newWorkTime,
      });
    },
    [draggingBlock, dragOffset, getContainerCoords, scrollOffset]
  );

  const handleEndDrag = useCallback(async () => {
    if (!draggingBlock) return;

    const currentDraggingBlock = draggingBlock;

    // 상태 초기화
    setDraggingBlock(null);
    setPointerPosition(null);

    //컨테이너 밖일 때 초기 위치로 복귀
    if (
      !isInBound(
        currentDraggingBlock.position,
        currentDraggingBlock,
        scrollOffset,
        containerRef.current,
        { x: 0, y: getYCoordinate(1) }
      )
    ) {
      const currentBlocks = getTimeUpdatedBlocks(
        workBlocks,
        currentDraggingBlock
      );

      animateBlocksTransition(currentBlocks, workBlocks);
      return;
    }

    // 충돌 해결 및 블록 정렬
    const { updatedBlock, sortedBlocks, newBlocks } = resolveCollision({
      draggingBlock: currentDraggingBlock,
      workBlocks,
      containerRef,
      scrollOffset,
    });

    animateBlocksTransition(newBlocks, sortedBlocks);

    await updateBlockTimeOnServer(updatedBlock);
  }, [
    animateBlocksTransition,
    containerRef,
    draggingBlock,
    scrollOffset,
    workBlocks,
  ]);

  useSetPointerEvents({
    onPointerMove: handlePointerMove,
    onPointerUp: handleEndDrag,
  });

  return {
    draggingBlock,
    pointerPosition,
    dragOffset,
    handleStartDrag,
  };
};
