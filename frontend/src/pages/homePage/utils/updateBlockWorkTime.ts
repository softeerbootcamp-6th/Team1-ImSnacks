import dayjs from 'dayjs';
import type { WorkBlockType } from '@/types/workCard.type';

const updateBlockWorkTime = (
  block: WorkBlockType,
  position: { x: number; y: number },
  px: number
) => {
  const newStartHour = position.x / px;
  const newStartMinutes = Math.round((position.x % px) * 0.6);

  const originalStartTime = dayjs(block.startTime);
  const originalEndTime = dayjs(block.endTime);
  const durationMinutes = originalEndTime.diff(originalStartTime, 'minute');

  const newStartTime = dayjs().hour(newStartHour).minute(newStartMinutes);
  const newEndTime = newStartTime.add(durationMinutes, 'minute');

  return {
    ...block,
    position,
    startTime: newStartTime.toISOString(),
    endTime: newEndTime.toISOString(),
    workTime: `${newStartTime.format('HH:mm')} - ${newEndTime.format('HH:mm')}`,
  };
};

export default updateBlockWorkTime;
