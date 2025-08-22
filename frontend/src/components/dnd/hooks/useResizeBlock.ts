import { useSetPointerEvents } from '@/hooks/useSetPointerEvents';
import updateBlockTimeOnServer from '@/pages/homePage/utils/work/updateBlockTimeOnServer';
import type { WorkBlockType } from '@/types/workCard.type';
import { useCallback, useState, type RefObject } from 'react';
import { useBlocksTransition } from './useBlocksTransition';
import { resolveCollision } from '../utils/resolveCollision';
import dayjs from 'dayjs';
import { X_PX_PER_HOUR } from '@/constants/workTimeCoordinate';
import { WORK_TIME_DEFAULT_X_COORDINATE } from '@/constants/workTimePx';

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
    (e: PointerEvent, block: WorkBlockType, direction: 'left' | 'right') => {
      setResizingBlock(block);
      setResizeDirection(direction);
    },
    [getContainerCoords]
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

      // width에 따른 duration 계산
      const durationHours = newWidth / X_PX_PER_HOUR;

      // 현재 시간을 기준으로 x 좌표를 시간으로 변환
      const baseDateTime = dayjs()
        .set('minute', 0)
        .set('second', 0)
        .set('millisecond', 0);

      const timeByPosition =
        (newX - WORK_TIME_DEFAULT_X_COORDINATE) / X_PX_PER_HOUR;
      const newStartTime = baseDateTime.add(timeByPosition, 'hour');
      const newEndTime = newStartTime.add(durationHours, 'hour');

      const updatedBlock = {
        ...resizingBlock,
        size: { ...resizingBlock.size, width: newWidth },
        position: { ...resizingBlock.position, x: newX },
        startTime: newStartTime.format('YYYY-MM-DDTHH:mm'),
        endTime: newEndTime.format('YYYY-MM-DDTHH:mm'),
        workTime: `${newStartTime.format('HH:mm')} - ${newEndTime.format(
          'HH:mm'
        )}`,
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
      draggingBlock: currentBlock,
      workBlocks: updatedBlocks,
      containerRef,
      scrollOffset,
    });

    animateBlocksTransition(newBlocks, sortedBlocks);

    await updateBlockTimeOnServer(updatedBlock);
  }, [
    animateBlocksTransition,
    containerRef,
    scrollOffset,
    workBlocks,
    resizingBlock,
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
