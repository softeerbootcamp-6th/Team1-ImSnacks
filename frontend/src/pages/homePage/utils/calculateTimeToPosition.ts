import dayjs from 'dayjs';

// 시간을 픽셀 위치로 변환하는 함수
const calculateTimeToPosition = (startTime: string, endTime: string) => {
  const startDateTime = dayjs(startTime);
  const endDateTime = dayjs(endTime);

  // 시작 시간을 분으로 변환 (자정 기준)
  const startTotalMinutes = startDateTime.hour() * 60 + startDateTime.minute();
  const endTotalMinutes = endDateTime.hour() * 60 + endDateTime.minute();

  // 작업 시간의 길이 (분)
  const durationMinutes = endTotalMinutes - startTotalMinutes;

  // WorkCell 너비(92px) + gap(8px) = 100px, 1시간 = 60분
  const x = (startTotalMinutes / 60) * 100;
  const width = (durationMinutes / 60) * 100;

  return { x, width };
};

export default calculateTimeToPosition;
