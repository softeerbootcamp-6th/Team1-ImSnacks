import { useState, useCallback, useEffect, type RefObject } from 'react';
import type { Position, WorkBlockType } from '@/types/workCard.type';
import isInBound from '@/dndTimeline/utils/isInBound';
import updateWorkTimeByPos from '@/dndTimeline/utils/updateWorkTimeByPos';
import { sortWorkBlocks } from '@/pages/homePage/utils/sortWorkBlocks';
import { patchMyWorkTime } from '@/apis/myWork.api';
import { getYCoordinate } from '@/constants/workTimeCoordinate';
import { useBlocksTransition } from '@/dndTimeline/hooks/useBlocksTransition';

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
  const [dragPosition, setDragPosition] = useState<Position | null>(null);

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
      setDragPosition(containerCoords);
    },
    [containerRef, getContainerCoords, scrollOffset]
  );

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (!draggingBlock) return;

      const containerCoords = getContainerCoords(e);
      setDragPosition(containerCoords);

      const newX = containerCoords.x + scrollOffset - dragOffset.x;
      const newY = containerCoords.y - dragOffset.y;
      const { newStartTime, newEndTime, newWorkTime } = updateWorkTimeByPos(
        draggingBlock.startTime,
        draggingBlock.endTime,
        { x: newX, y: newY }
      );

      setDraggingBlock({
        ...draggingBlock,
        position: { x: newX, y: newY },
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
    setDragPosition(null);

    //컨테이너 밖일 떄 초기 위치로 복귀
    if (
      !isInBound(
        currentDraggingBlock.position,
        currentDraggingBlock,
        scrollOffset,
        containerRef.current,
        { x: 0, y: getYCoordinate(1) }
      )
    ) {
      const currentBlocks = workBlocks.map(block => {
        if (block.id === currentDraggingBlock.id) {
          return currentDraggingBlock;
        }
        return block;
      });

      animateBlocksTransition(currentBlocks, workBlocks);
      return;
    }

    //TODO: 해당 위치에 놓을 수 없을 시 가능한 위치로 이동

    const newBlocks = workBlocks.map(block => {
      // 드래깅 중인 블록만 위치 업데이트
      if (block.id !== currentDraggingBlock.id) {
        return block;
      }

      const { newStartTime, newEndTime, newWorkTime } = updateWorkTimeByPos(
        currentDraggingBlock.startTime,
        currentDraggingBlock.endTime,
        currentDraggingBlock.position
      );

      return {
        ...block,
        position: currentDraggingBlock.position,
        startTime: newStartTime,
        endTime: newEndTime,
        workTime: newWorkTime,
      };
    });

    const newSortedBlocks = sortWorkBlocks(newBlocks);

    animateBlocksTransition(newBlocks, newSortedBlocks);

    try {
      await patchMyWorkTime({
        myWorkId: currentDraggingBlock.id,
        startTime: currentDraggingBlock.startTime,
        endTime: currentDraggingBlock.endTime,
      });
    } catch (error) {
      console.error('작업 시간 업데이트 실패:', error);
    }
  }, [
    animateBlocksTransition,
    containerRef,
    draggingBlock,
    scrollOffset,
    workBlocks,
  ]);

  useEffect(() => {
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handleEndDrag);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handleEndDrag);
    };
  }, [handlePointerMove, handleEndDrag]);

  return {
    draggingBlock,
    dragPosition,
    dragOffset,
    handleStartDrag,
  };
};
