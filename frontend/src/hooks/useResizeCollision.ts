import { useRef, useState } from 'react';
import type { Position, WorkBlockType } from '@/types/workCard.type';
import {
  findCollisionFreePosition,
  hasCollision,
} from '@/utils/collisionUtils';
import animateBlock from '@/utils/animateBlock';

interface UseResizeCollisionProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
  scrollOffset: number;
  allBlocks: WorkBlockType[];
  updateWorkBlocks: (blocks: WorkBlockType[]) => void;
}

export const useResizeCollision = ({
  containerRef,
  scrollOffset,
  allBlocks,
  updateWorkBlocks,
}: UseResizeCollisionProps) => {
  const revertAnimationRef = useRef<number | null>(null);
  const [isRevertingItemId, setIsRevertingItemId] = useState<number | null>(
    null
  );

  // 리사이징 후 충돌 검사 및 위치 조정
  const handleResizeCollision = (block: WorkBlockType, newWidth: number) => {
    if (containerRef?.current && allBlocks.length > 0) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const currentBlock = {
        ...block,
        size: { ...block.size, width: newWidth },
      };

      const otherBlocks = allBlocks.filter(b => b.id !== block.id);
      const hasCollisionWithOthers = otherBlocks.some(otherBlock =>
        hasCollision(currentBlock, otherBlock)
      );

      if (hasCollisionWithOthers) {
        const collisionFreePosition = findCollisionFreePosition(
          currentBlock,
          otherBlocks,
          containerRect,
          scrollOffset
        );

        setIsRevertingItemId(block.id);

        const latestBlocksRef = { current: allBlocks };

        animateBlock(
          revertAnimationRef,
          setIsRevertingItemId,
          latestBlocksRef,
          updateWorkBlocks,
          block.id,
          currentBlock.position,
          collisionFreePosition
        );
      }
    }
  };

  // 드래그 후 충돌 검사 및 위치 조정
  const handleDragCollision = (
    draggedBlock: WorkBlockType,
    targetPosition: Position
  ) => {
    if (containerRef?.current && allBlocks.length > 0) {
      const containerRect = containerRef.current.getBoundingClientRect();

      const otherBlocks = allBlocks.filter(b => b.id !== draggedBlock.id);
      const hasCollisionWithOthers = otherBlocks.some(otherBlock =>
        hasCollision({ ...draggedBlock, position: targetPosition }, otherBlock)
      );

      if (hasCollisionWithOthers) {
        const collisionFreePosition = findCollisionFreePosition(
          { ...draggedBlock, position: targetPosition },
          otherBlocks,
          containerRect,
          scrollOffset
        );

        setIsRevertingItemId(draggedBlock.id);

        const latestBlocksRef = { current: allBlocks };

        animateBlock(
          revertAnimationRef,
          setIsRevertingItemId,
          latestBlocksRef,
          updateWorkBlocks,
          draggedBlock.id,
          targetPosition,
          collisionFreePosition
        );

        return collisionFreePosition;
      }
    }
    return targetPosition;
  };

  return {
    handleResizeCollision,
    handleDragCollision,
    isRevertingItemId,
    revertAnimationRef,
  };
};
