import type { WorkBlockType } from '@/types/workCard.type';
import type { Position } from '@/types/position.type';
import { findCollisionFreePosition } from '@/lib/dnd/utils/collisionUtils';
import animateBlock from '@/lib/dnd/utils/animateBlock';

export const findFuturePosition = (
  updated: WorkBlockType[],
  draggingBlockId: number | null,
  containerRef: React.RefObject<HTMLDivElement | null>,
  scrollOffset: number
) => {
  if (!draggingBlockId) return;

  const draggedBlock = updated.find(block => block.id === draggingBlockId);
  if (!draggedBlock) return;

  const container = containerRef.current;
  if (!container) return;

  const containerRect = container.getBoundingClientRect();
  const collisionFreePosition = findCollisionFreePosition(
    draggedBlock,
    updated.filter(block => block.id !== draggingBlockId),
    containerRect,
    scrollOffset
  );
  return collisionFreePosition;
};

export const handleCollisionRevert = (
  draggingId: number,
  draggingBlock: WorkBlockType,
  futurePosition: Position | null,
  initialPosition: Position | null,
  revertAnimationRef: React.RefObject<number | null>,
  setIsRevertingItemId: React.Dispatch<React.SetStateAction<number | null>>,
  latestBlocksRef: React.RefObject<WorkBlockType[]>,
  updateWorkBlocks: (blocks: WorkBlockType[]) => void
) => {
  if (futurePosition) {
    animateBlock(
      revertAnimationRef,
      setIsRevertingItemId,
      latestBlocksRef,
      updateWorkBlocks,
      draggingId,
      draggingBlock.position,
      futurePosition
    );
  } else {
    // futurePosition이 없으면 원래 위치로 되돌리기
    setIsRevertingItemId(draggingId);

    if (initialPosition) {
      animateBlock(
        revertAnimationRef,
        setIsRevertingItemId,
        latestBlocksRef,
        updateWorkBlocks,
        draggingId,
        draggingBlock.position,
        initialPosition
      );
    }
  }
};

export const moveToValidPosition = (
  workTimeYCoordinates: number[],
  draggingId: number,
  draggingBlock: WorkBlockType,
  revertAnimationRef: React.RefObject<number | null>,
  setIsRevertingItemId: React.Dispatch<React.SetStateAction<number | null>>,
  latestBlocksRef: React.RefObject<WorkBlockType[]>,
  updateWorkBlocks: (blocks: WorkBlockType[]) => void
) => {
  if (!workTimeYCoordinates.includes(draggingBlock.position.y)) {
    const closestY = workTimeYCoordinates.reduce((closest, current) => {
      return Math.abs(current - draggingBlock.position.y) <
        Math.abs(closest - draggingBlock.position.y)
        ? current
        : closest;
    }, workTimeYCoordinates[0]);

    animateBlock(
      revertAnimationRef,
      setIsRevertingItemId,
      latestBlocksRef,
      updateWorkBlocks,
      draggingId,
      draggingBlock.position,
      { x: draggingBlock.position.x, y: closestY }
    );
    return true;
  }
  return false;
};

export const cleanupDragState = (
  setDraggingBlockId: React.Dispatch<React.SetStateAction<number | null>>,
  setFuturePosition: React.Dispatch<React.SetStateAction<Position | null>>,
  endDrag: () => void
) => {
  setDraggingBlockId(null);
  setFuturePosition(null);
  endDrag();
};
