import { useCallback, useRef } from 'react';
import dayjs from 'dayjs';
import type { WorkBlockType } from '@/types/workCard.type';
import calculateTimeToPosition from '../utils/calculateTimeToPosition';

interface UseResizeProps {
  onResize: (newBlock: WorkBlockType) => void;
}

export const useChangeTimeByResize = ({ onResize }: UseResizeProps) => {
  const resizeRef = useRef<{
    startX: number;
    startTime: dayjs.Dayjs;
    endTime: dayjs.Dayjs;
    direction: 'left' | 'right';
  } | null>(null);

  const handleResizeStart = useCallback(
    (
      e: React.PointerEvent<HTMLDivElement>,
      block: WorkBlockType,
      direction: 'left' | 'right'
    ) => {
      if (!block.size?.width) return;

      const startTime = dayjs(block.startTime);
      const endTime = dayjs(block.endTime);

      resizeRef.current = {
        startX: e.clientX,
        startTime,
        endTime,
        direction,
      };

      const handlePointerMove = (moveEvent: PointerEvent) => {
        if (!resizeRef.current) return;

        const { startX, startTime, endTime, direction } = resizeRef.current;
        const deltaX = moveEvent.clientX - startX;

        // 100px = 1시간 (60분)
        const minutesPerPixel = 60 / 100;
        const deltaMinutes = deltaX * minutesPerPixel;

        let newStartTime = startTime;
        let newEndTime = endTime;

        if (direction === 'left') {
          // 왼쪽 핸들: 시작 시간 변경
          newStartTime = startTime.add(deltaMinutes, 'minute');
        } else {
          // 오른쪽 핸들: 종료 시간 변경
          newEndTime = endTime.add(deltaMinutes, 'minute');
        }

        // 최소 30분 이상 유지
        const durationMinutes = newEndTime.diff(newStartTime, 'minute');
        if (durationMinutes < 30) return;

        const { x: newX, width: newWidth } = calculateTimeToPosition(
          newStartTime.toISOString(),
          newEndTime.toISOString()
        );

        onResize({
          ...block,
          position: {
            x: newX,
            y: block.position.y,
          },
          startTime: newStartTime.format('YYYY-MM-DDTHH:mm'),
          endTime: newEndTime.format('YYYY-MM-DDTHH:mm'),
          workTime: `${newStartTime.format('HH:mm')} - ${newEndTime.format(
            'HH:mm'
          )}`,
          size: { width: newWidth, height: block.size.height },
        });
      };

      const handlePointerUp = () => {
        resizeRef.current = null;
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerup', handlePointerUp);
      };

      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    },
    [onResize]
  );

  return {
    handleResizeStart,
  };
};
