import { useState, useCallback, useEffect, type RefObject } from 'react';
import type { WorkBlockType } from '@/types/workCard.type';
import updateWorkTimeByPos from '@/dndTimeline/utils/updateWorkTimeByPos';
import { sortWorkBlocks } from '@/pages/homePage/utils/sortWorkBlocks';
import type { Position } from '@/dndTimeline/types/position.type';

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
  const [dragPosition, setDragPosition] = useState<Position | null>(null);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });

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

  const handleEndDrag = useCallback(() => {
    if (!draggingBlock) return;

    const newBlocks = workBlocks.map(block => {
      const newBlockPosition = {
        x: draggingBlock.position.x,
        y: draggingBlock.position.y,
      };
      const { newStartTime, newEndTime, newWorkTime } = updateWorkTimeByPos(
        block.startTime,
        block.endTime,
        newBlockPosition
      );

      return block.id === draggingBlock.id
        ? {
            ...block,
            position: newBlockPosition,
            startTime: newStartTime,
            endTime: newEndTime,
            workTime: newWorkTime,
          }
        : block;
    });

    updateWorkBlocks(sortWorkBlocks(newBlocks));

    setDraggingBlock(null);
    setDragPosition(null);
  }, [draggingBlock, updateWorkBlocks, workBlocks]);

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
