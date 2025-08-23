import dayjs from 'dayjs';
import { WORK_TIME_DEFAULT_X_COORDINATE } from '@/constants/workTimePx';
import type { Position } from '@/types/position.type';
import { X_PX_PER_HOUR } from '@/constants/workTimeCoordinate';

const updateWorkTime = (
  startTime: string,
  endTime: string,
  position: Position,
  width?: number
) => {
  const baseDateTime = dayjs()
    .set('minute', 0)
    .set('second', 0)
    .set('millisecond', 0);

  // 현재 시간을 기준으로 x 좌표를 시간으로 변환
  const timeByPosition =
    (position.x - WORK_TIME_DEFAULT_X_COORDINATE) / X_PX_PER_HOUR;

  // 현재 시간에 상대적 시간을 더해서 새로운 시작 시간 계산
  const newStartTime = baseDateTime.add(timeByPosition, 'hour');

  let newEndTime: dayjs.Dayjs;

  if (width) {
    // width가 제공되면 width 기반으로 duration 계산 (리사이징용)
    const durationHours = width / X_PX_PER_HOUR;
    newEndTime = newStartTime.add(durationHours, 'hour');
  } else {
    // width가 없으면 기존 duration 유지 (드래그용)
    const durationMinutes = dayjs(endTime).diff(dayjs(startTime), 'minute');
    newEndTime = newStartTime.add(durationMinutes, 'minute');
  }

  return {
    newStartTime: newStartTime.format('YYYY-MM-DDTHH:mm'),
    newEndTime: newEndTime.format('YYYY-MM-DDTHH:mm'),
    newWorkTime: `${newStartTime.format('HH:mm')} - ${newEndTime.format(
      'HH:mm'
    )}`,
  };
};

export default updateWorkTime;
