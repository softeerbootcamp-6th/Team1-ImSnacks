import type { WorkBlockType } from '@/types/workCard.type';
import type { RefObject } from 'react';
import { findCollisionFreePosition } from '@/components/dnd/utils/collisionUtils';
import isFullyOverlapped from '@/components/dnd/utils/isFullyOverlapped';
import {
  getTimeUpdatedBlock,
  getTimeUpdatedBlocks,
} from '@/pages/homePage/utils/work/updateBlockTime';
import { sortWorkBlocks } from '@/pages/homePage/utils/work/sortWorkBlocks';
import {
  WORK_BLOCK_Y_COORDINATE_GAP,
  getGlobalMaxLayer,
} from '@/constants/workTimeCoordinate';

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
  containerRef,
  scrollOffset,
}: ResolveCollisionParams): ResolveCollisionResult => {
  // 해당 x좌표와 valid한 y좌표 조합에 블록이 이미 존재하는지 확인
  // 블록이 이미 있다면 가능한 위치로 이동
  const otherBlocks = workBlocks.filter(b => b.id !== activeBlock.id);

  const newBlocks = getTimeUpdatedBlocks(workBlocks, activeBlock);

  // 전역 변수에서 최대 레이어 가져오기
  const maxLayer = getGlobalMaxLayer();

  if (isFullyOverlapped(activeBlock, otherBlocks, maxLayer)) {
    // const collisionFreePosition = findCollisionFreePosition(
    //   activeBlock,
    //   otherBlocks,
    //   containerRef.current?.getBoundingClientRect() ?? new DOMRect(),
    //   scrollOffset
    // );

    // 현재 블록이 가득차있는 블록이면 y좌표를 증가하여 생성
    const newPosition = {
      x: activeBlock.position.x,
      y: activeBlock.position.y + WORK_BLOCK_Y_COORDINATE_GAP * (maxLayer - 1),
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

  const { blocks: sortedBlocks } = sortWorkBlocks(newBlocks);
  return { updatedBlock: activeBlock, sortedBlocks, newBlocks };
};
