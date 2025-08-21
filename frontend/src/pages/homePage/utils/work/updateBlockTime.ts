import type { WorkBlockType } from '@/types/workCard.type';
import updateWorkTimeByPos from './updateWorkTimeByPos';

export const getTimeUpdatedBlock = (
  block: WorkBlockType,
  currentBlock: WorkBlockType
) => {
  const { newStartTime, newEndTime, newWorkTime } = updateWorkTimeByPos(
    currentBlock.startTime,
    currentBlock.endTime,
    currentBlock.position
  );

  return {
    ...block,
    position: currentBlock.position,
    startTime: newStartTime,
    endTime: newEndTime,
    workTime: newWorkTime,
  };
};

export const getTimeUpdatedBlocks = (
  blocks: WorkBlockType[],
  currentBlock: WorkBlockType
) => {
  const newBlocks = blocks.map(block => {
    if (block.id !== currentBlock.id) {
      return block;
    }
    return getTimeUpdatedBlock(block, currentBlock);
  });
  return newBlocks;
};
