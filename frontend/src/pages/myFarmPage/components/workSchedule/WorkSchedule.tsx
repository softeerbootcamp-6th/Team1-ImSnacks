import MyFarmHeader from '../myFarmHeader/MyFarmHeader';
import WeeklyCalendar from '../weeklyCalendar/WeeklyCalendar';
import WeekNavigator from '../weekNavigator/WeekNavigator';
import { useWeeklyWorkSchedule } from '../../hooks/useWeeklyWorkSchedule';
import { WORK_SCHEDULE_DATA } from '@/constants/workScheduleData';
import { groupDataRecordStructure } from '@/utils/groupDataRecord';
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

  // 각 날짜별 작업 데이터를 key: date, value: workCardData 형태로 변환
  const workScheduleDataByDate = groupDataRecordStructure(
    WORK_SCHEDULE_DATA,
    'date',
    'workCardData'
  );

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
          workScheduleDataByDate={workScheduleDataByDate}
        />
      </div>
    </div>
  );
};

export default WorkSchedule;
