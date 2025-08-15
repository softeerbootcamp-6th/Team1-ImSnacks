import dayjs from 'dayjs';

// 시간을 픽셀 위치로 변환하는 함수
const calculateTimeToPosition = (startTime: string, endTime: string) => {
  const startDateTime = dayjs(startTime);
  const endDateTime = dayjs(endTime);

  const baseDateTime = dayjs()
    .set('minute', 0)
    .set('second', 0)
    .set('millisecond', 0);

  const durationMinutes = endDateTime.diff(startDateTime, 'minute');
  const relativeMinutes = startDateTime.diff(baseDateTime, 'minute');

  const x = (relativeMinutes / 60) * 100;
  const width = (durationMinutes / 60) * 100;

  return { x, width };
};

export default calculateTimeToPosition;
