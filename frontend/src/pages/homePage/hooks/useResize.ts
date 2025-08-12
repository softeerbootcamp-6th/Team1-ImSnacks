import { useCallback, useRef } from 'react';
import dayjs from 'dayjs';
import type { WorkBlockType } from '@/types/workCard.type';
import { calculateTimeToPosition } from '@/pages/homePage/utils/getInitialWorkBlocks';

interface UseResizeProps {
  onResize: (newBlock: WorkBlockType) => void;
}

export const useResize = ({ onResize }: UseResizeProps) => {
  const resizeRef = useRef<{
    startX: number;
    startTime: dayjs.Dayjs;
    endTime: dayjs.Dayjs;
    direction: 'left' | 'right';
  } | null>(null);

  const handleResizeStart = useCallback(
    (
      e: React.MouseEvent<HTMLDivElement>,
      block: WorkBlockType,
      direction: 'left' | 'right'
    ) => {
      e.stopPropagation();

      if (!block.size?.width) return;

      const startTime = dayjs(block.startTime);
      const endTime = dayjs(block.endTime);

      resizeRef.current = {
        startX: e.clientX,
        startTime,
        endTime,
        direction,
      };

      const handleMouseMove = (moveEvent: MouseEvent) => {
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
          startTime: newStartTime.toISOString(),
          endTime: newEndTime.toISOString(),
          workTime: `${newStartTime.format('HH:mm')} - ${newEndTime.format(
            'HH:mm'
          )}`,
          size: { width: newWidth, height: block.size.height },
        });
      };

      const handleMouseUp = () => {
        resizeRef.current = null;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [onResize]
  );

  return {
    handleResizeStart,
  };
};
