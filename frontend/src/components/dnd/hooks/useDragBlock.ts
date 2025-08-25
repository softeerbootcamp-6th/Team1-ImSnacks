import { useSetPointerEvents } from '@/hooks/useSetPointerEvents';
import updateBlockTimeOnServer from '@/pages/homePage/utils/work/updateBlockTimeOnServer';
import updateWorkTime from '@/pages/homePage/utils/work/updateWorkTime';
import type { WorkBlockType } from '@/types/workCard.type';
import { useCallback, useState, type RefObject } from 'react';
import type { Position } from '@/types/position.type';
import isInBound from '@/utils/isInBound';
import { getYCoordinate } from '@/constants/workTimeCoordinate';
import { useBlocksTransition } from '@/components/dnd/hooks/useBlocksTransition';
import { resolveCollision } from '../utils/resolveCollision';
import { snapPositionToGrid } from '@/utils/snapToGrid';
import { getTimeUpdatedBlocks } from '@/pages/homePage/utils/work/updateBlockTime';
import { useQueryClient } from '@tanstack/react-query';

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
  const [dragPointerPosition, setDragPointerPosition] =
    useState<Position | null>(null);

  //마우스 위치와 블록 위치 차이
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });

  // 블록 이동 애니메이션 훅
  const { animateBlocksTransition } =
    useBlocksTransition<WorkBlockType>(updateWorkBlocks);

  const queryClient = useQueryClient();

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
      setDragPointerPosition(containerCoords);
    },
    [containerRef, getContainerCoords, scrollOffset]
  );

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (!draggingBlock) return;

      const containerCoords = getContainerCoords(e);
      setDragPointerPosition(containerCoords);

      const newPosition = {
        x: containerCoords.x + scrollOffset - dragOffset.x,
        y: containerCoords.y - dragOffset.y,
      };

      // 6px 그리드에 스냅 (y는 validY로 제한)
      const snappedPosition = snapPositionToGrid({
        x: newPosition.x,
        y: newPosition.y,
      });

      const { newStartTime, newEndTime, newWorkTime } = updateWorkTime(
        draggingBlock.startTime,
        draggingBlock.endTime,
        snappedPosition
      );

      setDraggingBlock({
        ...draggingBlock,
        position: snappedPosition,
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

    setDraggingBlock(null);
    setDragPointerPosition(null);

    //컨테이너 밖일 때 초기 위치로 복귀
    if (
      !isInBound(
        currentDraggingBlock.position,
        currentDraggingBlock,
        scrollOffset,
        containerRef.current,
        { x: 0, y: getYCoordinate(1) },
        { x: 0, y: 10 }
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
      activeBlock: currentDraggingBlock,
      workBlocks,
      containerRef,
      scrollOffset,
    });

    animateBlocksTransition(newBlocks, sortedBlocks);

    await updateBlockTimeOnServer(updatedBlock, queryClient);
  }, [
    animateBlocksTransition,
    containerRef,
    draggingBlock,
    queryClient,
    scrollOffset,
    workBlocks,
  ]);

  useSetPointerEvents({
    onPointerMove: handlePointerMove,
    onPointerUp: handleEndDrag,
  });

  return {
    draggingBlock,
    dragPointerPosition,
    dragOffset,
    handleStartDrag,
  };
};
