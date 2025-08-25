import { getYCoordinate } from '@/constants/workTimeCoordinate';
import { hasCollision } from '@/lib/dnd/utils/collisionUtils';
import type { WorkBlockType } from '@/types/workCard.type';

const isFullyOverlapped = (
  currentDraggingBlock: WorkBlockType,
  otherBlocks: WorkBlockType[],
  maxLayer: number
) => {
  const collidesAtY = (y: number) =>
    otherBlocks.some(otherBlock =>
      hasCollision(
        {
          ...currentDraggingBlock,
          position: { x: currentDraggingBlock.position.x, y },
        },
        otherBlock
      )
    );

  // 동적으로 y좌표 생성 (1부터 maxLayer까지)
  const dynamicYCoordinates = Array.from({ length: maxLayer }, (_, index) =>
    getYCoordinate(index + 1)
  );

  return dynamicYCoordinates.every(y => collidesAtY(y));
};

export default isFullyOverlapped;
