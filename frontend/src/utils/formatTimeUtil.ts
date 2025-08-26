import dayjs from 'dayjs';

export const formatCurrentTime = (currentTime: dayjs.Dayjs) => {
  return {
    date: currentTime.format('M월 D일'),
    time: currentTime.format('h:mm A'),
  };
};

export function formatRelativeTime(
  targetDate: Date | string,
  currentTime: dayjs.Dayjs
): string {
  const target = dayjs(targetDate);
  const diffSeconds = currentTime.diff(target, 'second');

  if (diffSeconds < 60) {
    return `${diffSeconds}초 전`;
  }
  const diffMinutes = currentTime.diff(target, 'minute');
  if (diffMinutes < 60) {
    return `${diffMinutes}분 전`;
  }
  const diffHours = currentTime.diff(target, 'hour');
  if (diffHours < 24) {
    return `${diffHours}시간 전`;
  }
  const diffDays = currentTime.diff(target, 'day');
  return `${diffDays}일 전`;
}
