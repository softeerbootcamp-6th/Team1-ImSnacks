import type { WorkBlockType } from '@/types/workCard.type';
import type { Position } from '@/lib/dnd/types/position.type';
import updateBlockWorkTime from '@/pages/homePage/desktop/utils/updateBlockWorkTime';

const animateBlock = (
  revertAnimationRef: React.RefObject<number | null>,
  setIsAnimatingBlockId: React.Dispatch<React.SetStateAction<number | null>>,
  latestBlocksRef: React.RefObject<WorkBlockType[]>,
  updateWorkBlocks: (blocks: WorkBlockType[]) => void,
  blockId: number,
  from: Position,
  to: Position,
  durationMs: number = 250
) => {
  if (revertAnimationRef.current !== null) {
    cancelAnimationFrame(revertAnimationRef.current);
    revertAnimationRef.current = null;
  }

  const start = performance.now();
  const step = (now: number) => {
    const elapsed = now - start;
    const t = Math.min(1, elapsed / durationMs);
    const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
    const x = from.x + (to.x - from.x) * eased;
    const y = from.y + (to.y - from.y) * eased;

    const updated = latestBlocksRef.current.map(block =>
      block.id === blockId ? updateBlockWorkTime(block, { x, y }, 100) : block
    );
    updateWorkBlocks(updated);

    if (t < 1) {
      revertAnimationRef.current = requestAnimationFrame(step);
    } else {
      revertAnimationRef.current = null;
      setIsAnimatingBlockId(null);
    }
  };

  revertAnimationRef.current = requestAnimationFrame(step);
};

export default animateBlock;
