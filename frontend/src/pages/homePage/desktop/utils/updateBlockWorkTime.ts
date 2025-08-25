import dayjs from 'dayjs';
import type { WorkBlockType } from '@/types/workCard.type';
import { WORK_TIME_DEFAULT_X_COORDINATE } from '@/constants/workTimeCoordinate';

const updateBlockWorkTime = (
  block: WorkBlockType,
  position: { x: number; y: number },
  px: number
) => {
  const baseDateTime = dayjs()
    .set('minute', 0)
    .set('second', 0)
    .set('millisecond', 0);

  // 현재 시간을 기준으로 x 좌표를 시간으로 변환
  const timeByPosition = (position.x - WORK_TIME_DEFAULT_X_COORDINATE) / px;

  // 현재 시간에 상대적 시간을 더해서 새로운 시작 시간 계산
  const newStartTime = baseDateTime.add(timeByPosition, 'hour');

  const durationMinutes = dayjs(block.endTime).diff(
    dayjs(block.startTime),
    'minute'
  );

  const newEndTime = newStartTime.add(durationMinutes, 'minute');

  return {
    ...block,
    position,
    startTime: newStartTime.format('YYYY-MM-DDTHH:mm'),
    endTime: newEndTime.format('YYYY-MM-DDTHH:mm'),
    workTime: `${newStartTime.format('HH:mm')} - ${newEndTime.format('HH:mm')}`,
  };
};

export default updateBlockWorkTime;
