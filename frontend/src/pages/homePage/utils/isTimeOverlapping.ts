import dayjs from 'dayjs';

// 시간 겹침 여부 체크
const isTimeOverlapping = (
  a: { startTime: string; endTime: string },
  b: { startTime: string; endTime: string }
) => {
  const startA = dayjs(a.startTime).valueOf();
  const endA = dayjs(a.endTime).valueOf();
  const startB = dayjs(b.startTime).valueOf();
  const endB = dayjs(b.endTime).valueOf();
  return !(startA >= endB || endA <= startB);
};

export default isTimeOverlapping;
