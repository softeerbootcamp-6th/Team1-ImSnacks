import type { WorkBlockType } from '@/types/workCard.type';

export const useResizeBlock = (
  workBlocks: WorkBlockType[],
  updateWorkBlocks: (blocks: WorkBlockType[]) => void
) => {
  const handleResize = (blockId: number, newBlock: WorkBlockType) => {
    const updatedBlocks = workBlocks.map(b =>
      b.id === blockId ? newBlock : b
    );
    updateWorkBlocks(updatedBlocks);
  };

  return { handleResize };
};
