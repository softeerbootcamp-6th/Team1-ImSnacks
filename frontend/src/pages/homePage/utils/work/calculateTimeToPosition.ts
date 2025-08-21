import dayjs from 'dayjs';
import { WORK_TIME_DEFAULT_X_COORDINATE } from '@/constants/workTimePx';

// 시간을 픽셀 위치로 변환하는 함수
const calculateTimeToPosition = (startTime: string, endTime: string) => {
  const baseDateTime = dayjs()
    .set('minute', 0)
    .set('second', 0)
    .set('millisecond', 0);

  const startDateTime = dayjs(startTime);
  const endDateTime = dayjs(endTime);

  const durationMinutes = endDateTime.diff(startDateTime, 'minute');
  const relativeMinutes = startDateTime.diff(baseDateTime, 'minute');

  const x = WORK_TIME_DEFAULT_X_COORDINATE + (relativeMinutes / 60) * 100;
  const width = (durationMinutes / 60) * 100;

  return { x, width };
};

export default calculateTimeToPosition;
