import dayjs from 'dayjs';
import { useBaseWeeklyCalendar } from '../../../hooks/useWeeklyCalendar';

export const useWeeklyWorkSchedule = () => {
  const {
    currentDate,
    weekDates,
    handlePreviousWeek,
    handleNextWeek,
    monthLabel,
  } = useBaseWeeklyCalendar();

  // 현재 주 판단 로직 (프로젝트 특화)
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
    weekDates,
    handlePreviousWeek,
    handleNextWeek,
    weekLabel,
    monthLabel,
    isCurrentWeek,
  };
};
