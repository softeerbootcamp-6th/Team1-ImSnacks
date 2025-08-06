import { useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

// 한국어 locale 설정
dayjs.locale('ko');

export const useBaseWeeklyCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getWeekDates = (date: Date) => {
    const startOfWeek = dayjs(date).startOf('week');

    return Array.from({ length: 7 }, (_, i) =>
      startOfWeek.add(i, 'day').toDate()
    );
  };

  const weekDates = getWeekDates(currentDate);

  const handlePreviousWeek = (offset: number) => {
    setCurrentDate(prev => dayjs(prev).subtract(offset, 'week').toDate());
  };

  const handleNextWeek = (offset: number) => {
    setCurrentDate(prev => dayjs(prev).add(offset, 'week').toDate());
  };

  const monthLabel = dayjs(currentDate).format('YYYY년 M월');

  return {
    currentDate,
    weekDates,
    handlePreviousWeek,
    handleNextWeek,
    monthLabel,
  };
};
