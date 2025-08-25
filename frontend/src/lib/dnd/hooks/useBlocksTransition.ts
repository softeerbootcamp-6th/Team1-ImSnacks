import { useCallback, useRef } from 'react';
import type { BlockType } from '@/lib/dnd/types/blockType.type';

export const useBlocksTransition = <T extends BlockType>(
  updateWorkBlocks: (blocks: T[]) => void
) => {
  const timeoutRef = useRef<number | null>(null);

  const animateBlocksTransition = useCallback(
    (prevBlocks: T[], nextBlocks: T[], durationMs: number = 250) => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      const start = performance.now();
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

      const fromMap = new Map<number, T>();
      prevBlocks.forEach(b => fromMap.set(Number(b.id), b));

      const step = () => {
        const now = performance.now();
        const elapsed = now - start;
        const t = Math.min(1, elapsed / durationMs);
        const eased = easeOutCubic(t);

        const frameBlocks: T[] = nextBlocks.map(toBlock => {
          const id = Number(toBlock.id);
          const fromBlock = fromMap.get(id);
          if (!fromBlock) return toBlock;

          const { x: fromX, y: fromY } = fromBlock.position;
          const fromW = fromBlock.size?.width ?? 0;
          const { x: toX, y: toY } = toBlock.position;
          const toW = toBlock.size?.width ?? 0;

          const x = fromX + (toX - fromX) * eased;
          const y = fromY + (toY - fromY) * eased;
          const width = fromW + (toW - fromW) * eased;

          return {
            ...toBlock,
            position: { x, y },
            size: { ...toBlock.size, width },
          } as T;
        });

        updateWorkBlocks(frameBlocks);

        if (t < 1) {
          timeoutRef.current = window.setTimeout(step, 16);
        } else {
          timeoutRef.current = null;
          updateWorkBlocks(nextBlocks);
        }
      };

      step();
    },
    [updateWorkBlocks]
  );

  return { animateBlocksTransition };
};

export default useBlocksTransition;
