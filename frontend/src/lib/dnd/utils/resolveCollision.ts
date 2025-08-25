import type { WorkBlockType } from '@/types/workCard.type';
import type { RefObject } from 'react';
import isFullyOverlapped from '@/lib/dnd/utils/isFullyOverlapped';
import {
  getTimeUpdatedBlock,
  getTimeUpdatedBlocks,
} from '@/pages/homePage/desktop/utils/updateBlockTime';
import { sortWorkBlocks } from '@/pages/homePage/desktop/utils/sortWorkBlocks';
import { getYCoordinate } from '@/constants/workTimeCoordinate';
import useMaxLayerStore from '@/store/useMaxLayerStore';

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
  // 블록이 이미 있다면 가능한 위치로 이동
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
