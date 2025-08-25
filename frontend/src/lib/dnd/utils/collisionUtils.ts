import type { Position } from '@/lib/dnd/types/position.type';
import type { Size } from '@/lib/dnd/types/size.type';
import type { WorkBlockType } from '@/types/workCard.type';
import type { RefObject } from 'react';
import isFullyOverlapped from '@/lib/dnd/utils/isFullyOverlappedUtil';
import {
  getTimeUpdatedBlock,
  getTimeUpdatedBlocks,
} from '@/pages/homePage/desktop/utils/updateBlockTime';
import { sortWorkBlocks } from '@/pages/homePage/desktop/utils/sortWorkBlocks';
import { getYCoordinate } from '@/constants/workTimeCoordinate';
import useMaxLayerStore from '@/store/useMaxLayerStore';

// 충돌 감지 함수
export const hasCollision = (
  currentBlock: { position: Position; size: Size },
  targetBlock: { position: Position; size: Size }
): boolean => {
  const currentCenterX = currentBlock.position.x + currentBlock.size.width / 2;
  const currentCenterY = currentBlock.position.y + currentBlock.size.height / 2;

  const targetCenterX = targetBlock.position.x + targetBlock.size.width / 2;
  const targetCenterY = targetBlock.position.y + targetBlock.size.height / 2;

  const distanceX = Math.abs(currentCenterX - targetCenterX);
  const distanceY = Math.abs(currentCenterY - targetCenterY);

  return (
    distanceX < currentBlock.size.width / 2 + targetBlock.size.width / 2 &&
    distanceY < currentBlock.size.height / 2 + targetBlock.size.height / 2
  );
};

export const hasCollisionWithOthers = (
  draggingBlock: WorkBlockType,
  workBlocks: WorkBlockType[],
  draggingBlockId: number
): boolean => {
  return workBlocks.some(block => {
    if (block.id === draggingBlockId) return false;
    return hasCollision(draggingBlock, block);
  });
};

interface ResolveCollisionParams {
  activeBlock: WorkBlockType;
  workBlocks: WorkBlockType[];
  containerRef: RefObject<HTMLDivElement | null>;
  scrollOffset: number;
}

interface ResolveCollisionResult {
  updatedBlock: WorkBlockType;
  sortedBlocks: WorkBlockType[];
  newBlocks: WorkBlockType[];
}

export const resolveCollision = ({
  activeBlock,
  workBlocks,
}: ResolveCollisionParams): ResolveCollisionResult => {
  // 해당 x좌표와 valid한 y좌표 조합에 블록이 이미 존재하는지 확인
  // 블록이 이미 있다면 y좌표를 증가하여 생성
  const otherBlocks = workBlocks.filter(b => b.id !== activeBlock.id);

  const newBlocks = getTimeUpdatedBlocks(workBlocks, activeBlock);

  const { maxLayer } = useMaxLayerStore.getState();

  if (isFullyOverlapped(activeBlock, otherBlocks, maxLayer)) {
    // 현재 블록이 가득차있는 블록이면 y좌표를 증가하여 생성
    const newPosition = {
      x: activeBlock.position.x,
      y: getYCoordinate(maxLayer),
    };

    const updatedBlock = getTimeUpdatedBlock(activeBlock, {
      ...activeBlock,
      position: newPosition,
    });

    const sortedBlocks = sortWorkBlocks(
      getTimeUpdatedBlocks(workBlocks, updatedBlock)
    );

    return { updatedBlock, sortedBlocks, newBlocks };
  }

  const sortedBlocks = sortWorkBlocks(newBlocks);
  return { updatedBlock: activeBlock, sortedBlocks, newBlocks };
};
