import { useSetPointerEvents } from '@/hooks/useSetPointerEvents';
import updateBlockTimeOnServer from '@/pages/homePage/utils/work/updateBlockTimeOnServer';
import type { WorkBlockType } from '@/types/workCard.type';
import { useCallback, useState, type RefObject } from 'react';
import { useBlocksTransition } from './useBlocksTransition';
import { resolveCollision } from '../utils/resolveCollision';
import { X_PX_PER_HOUR } from '@/constants/workTimeCoordinate';
import updateWorkTime from '@/pages/homePage/utils/work/updateWorkTime';
import {
  snapPositionToGrid,
  snapWidthToGrid,
  snapToGrid,
} from '@/utils/snapToGrid';
import { useQueryClient } from '@tanstack/react-query';

interface UseResizeBlockProps {
  containerRef: RefObject<HTMLDivElement | null>;
  scrollOffset: number;
  workBlocks: WorkBlockType[];
  updateWorkBlocks: (blocks: WorkBlockType[]) => void;
}

export const useResizeBlock = ({
  containerRef,
  scrollOffset,
  workBlocks,
  updateWorkBlocks,
}: UseResizeBlockProps) => {
  const [resizingBlock, setResizingBlock] = useState<WorkBlockType | null>(
    null
  );
  const [resizeDirection, setResizeDirection] = useState<
    'left' | 'right' | null
  >(null);

  const queryClient = useQueryClient();

  const { animateBlocksTransition } =
    useBlocksTransition<WorkBlockType>(updateWorkBlocks);

  const getContainerCoords = useCallback(
    (e: PointerEvent) => {
      if (!containerRef.current) return { x: 0, y: 0 };
      const rect = containerRef.current.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    },
    [containerRef]
  );

  const handleResizeStart = useCallback(
    (_e: PointerEvent, block: WorkBlockType, direction: 'left' | 'right') => {
      setResizingBlock(block);
      setResizeDirection(direction);
    },
    []
  );

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (!resizingBlock || !resizeDirection) return;

      const containerCoords = getContainerCoords(e);

      let newWidth = resizingBlock.size.width;
      let newX = resizingBlock.position.x;

      if (resizeDirection === 'right') {
        // 오른쪽 핸들: width만 변경
        newWidth = Math.max(
          X_PX_PER_HOUR / 2,
          containerCoords.x + scrollOffset - resizingBlock.position.x
        );
      } else if (resizeDirection === 'left') {
        // 왼쪽 핸들: x좌표와 width 모두 변경
        const newRightEdge =
          resizingBlock.position.x + resizingBlock.size.width;
        newX = Math.min(
          newRightEdge - X_PX_PER_HOUR / 2,
          containerCoords.x + scrollOffset
        ); // 최소 30분 유지
        newWidth = newRightEdge - newX;
      }

      // 6px 그리드에 스냅
      const snappedX = snapToGrid(newX);
      const snappedWidth = snapWidthToGrid(newWidth);
      const snappedPosition = snapPositionToGrid({
        x: snappedX,
        y: resizingBlock.position.y,
      });

      const { newStartTime, newEndTime, newWorkTime } = updateWorkTime(
        resizingBlock.startTime,
        resizingBlock.endTime,
        snappedPosition,
        snappedWidth
      );

      const updatedBlock = {
        ...resizingBlock,
        size: { ...resizingBlock.size, width: snappedWidth },
        position: { ...resizingBlock.position, x: snappedX },
        startTime: newStartTime,
        endTime: newEndTime,
        workTime: newWorkTime,
      };

      setResizingBlock(updatedBlock);
    },
    [resizingBlock, resizeDirection, getContainerCoords, scrollOffset]
  );

  const handleResizeEnd = useCallback(async () => {
    if (!resizingBlock) return;

    const currentBlock = resizingBlock;
    setResizingBlock(null);
    setResizeDirection(null);

    const updatedBlocks = workBlocks.map(block =>
      block.id === currentBlock.id ? currentBlock : block
    );

    const { updatedBlock, sortedBlocks, newBlocks } = resolveCollision({
      activeBlock: currentBlock,
      workBlocks: updatedBlocks,
      containerRef,
      scrollOffset,
    });

    animateBlocksTransition(newBlocks, sortedBlocks);

    await updateBlockTimeOnServer(updatedBlock, queryClient);
  }, [
    resizingBlock,
    workBlocks,
    containerRef,
    scrollOffset,
    animateBlocksTransition,
    queryClient,
  ]);

  useSetPointerEvents({
    onPointerMove: handlePointerMove,
    onPointerUp: handleResizeEnd,
  });

  return {
    resizingBlock,
    handleResizeStart,
    handleResizeEnd,
  };
};
