import { useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

// 한국어 locale 설정
dayjs.locale('ko');

export const useWeeklyCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const dayNames = Array.from({ length: 7 }, (_, i) =>
    dayjs().day(i).format('ddd')
  );

  const getWeekDates = (date: Date) => {
    const startOfWeek = dayjs(date).startOf('week');

    return Array.from({ length: 7 }, (_, i) =>
      startOfWeek.add(i, 'day').toDate()
    );
  };

  const weekDates = getWeekDates(currentDate);

  const handlePreviousWeek = () => {
    setCurrentDate(prev => dayjs(prev).subtract(1, 'week').toDate());
  };

  const handleNextWeek = () => {
    setCurrentDate(prev => dayjs(prev).add(1, 'week').toDate());
  };

  const DateYYYYM = dayjs(currentDate).format('YYYY년 M월');

  // 현재 주 판단 로직
  const getWeekLabel = () => {
    const today = dayjs();
    const currentWeekStart = dayjs(currentDate).startOf('week');
    const todayWeekStart = today.startOf('week');

    const weekDiff = currentWeekStart.diff(todayWeekStart, 'week');

    return weekDiff === 0
      ? '이번 주'
      : weekDiff < 0
      ? `${Math.abs(weekDiff)}주 전`
      : `${weekDiff}주 후`;
  };

  const weekLabel = getWeekLabel();
  const isCurrentWeek = getWeekLabel() === '이번 주';

  return {
    currentDate,
    dayNames,
    weekDates,
    handlePreviousWeek,
    handleNextWeek,
    DateYYYYM,
    weekLabel,
    isCurrentWeek,
  };
};
