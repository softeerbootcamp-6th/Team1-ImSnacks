import { WORK_TIME_Y_COORDINATE_LIST } from '@/constants/workTimeCoordinate';
import { hasCollision } from '@/components/dnd/utils/collisionUtils';
import type { WorkBlockType } from '@/types/workCard.type';

const isFullyOverlapped = (
  currentDraggingBlock: WorkBlockType,
  otherBlocks: WorkBlockType[]
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

  return WORK_TIME_Y_COORDINATE_LIST.every(y => collidesAtY(y));
};

export default isFullyOverlapped;
