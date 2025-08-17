import type dayjs from 'dayjs';

export const formatCurrentTime = (currentTime: dayjs.Dayjs) => {
  return {
    date: currentTime.format('M월 D일'),
    time: currentTime.format('h:mm A'),
  };
};
