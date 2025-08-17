import MyFarmHeader from '../myFarmHeader/MyFarmHeader';
import WeeklyCalendar from '../weeklyCalendar/WeeklyCalendar';
import WeekNavigator from '../weekNavigator/WeekNavigator';
import { useWeeklyWorkSchedule } from '../../hooks/useWeeklyWorkSchedule';
import { useMyWorkOfWeekly } from '../../hooks/useMyWorkOfWeekly';
import S from './WorkSchedule.style';

const WorkSchedule = () => {
  const {
    weekDates,
    handlePreviousWeek,
    handleNextWeek,
    weekLabel,
    monthLabel,
    isCurrentWeek,
  } = useWeeklyWorkSchedule();

  const { myWorkOfWeekly } = useMyWorkOfWeekly(weekDates);

  return (
    <div css={S.WorkScheduleContainer}>
      <MyFarmHeader title="작업 이력" />
      <div css={S.WorkScheduleContent}>
        <div css={S.WorkScheduleHeader}>
          <span>{monthLabel}</span>
          <WeekNavigator
            weekLabel={weekLabel}
            onPreviousWeek={() => handlePreviousWeek(1)}
            onNextWeek={() => handleNextWeek(1)}
            isCurrentWeek={isCurrentWeek}
          />
        </div>
        <WeeklyCalendar
          weekDates={weekDates}
          workScheduleDataByDate={myWorkOfWeekly ?? {}}
        />
      </div>
    </div>
  );
};

export default WorkSchedule;
