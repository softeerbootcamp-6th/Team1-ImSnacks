import { css } from '@emotion/react';
import MyFarmHeader from '../myFarmHeader/MyFarmHeader';
import WeeklyCalendar from '../weeklyCalendar/WeeklyCalendar';
import WeekNavigator from '../weekNavigator/WeekNavigator';
import { useWeeklyCalendar } from '../../../../hooks/useWeeklyCalendar';
import { Spacing } from '@/styles/spacing';
import { BorderRadius } from '@/styles/borderRadius';
import { customBorderGradientStyles } from '@/styles/customBorderGradientStyles';
import { GrayScale, Opacity } from '@/styles/colors';
import { Typography } from '@/styles/typography';
import { WORK_SCHEDULE_DATA } from '@/constants/workScheduleData';
import { groupDataRecordStructure } from '@/utils/groupDataRecord';

const WorkSchedule = () => {
  const {
    weekDates,
    handlePreviousWeek,
    handleNextWeek,
    weekLabel,
    monthLabel,
    isCurrentWeek,
  } = useWeeklyCalendar();

  // 각 날짜별 작업 데이터를 key: date, value: workCardData 형태로 변환
  const workScheduleDataByDate = groupDataRecordStructure(
    WORK_SCHEDULE_DATA,
    'date',
    'workCardData'
  );

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
      `}
    >
      <MyFarmHeader title="작업 이력" />
      <div
        css={css`
          height: 770px;
          display: flex;
          flex-direction: column;
          border-radius: ${BorderRadius.Base.S_Hard};
          ${customBorderGradientStyles.gradientBorder}
          padding: ${Spacing.Spacing300};
          gap: ${Spacing.Spacing300};
          background-color: ${Opacity.White.W100};
        `}
      >
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
            ${Typography.Body_L_500}
            color: ${GrayScale.White};
            padding: 0 ${Spacing.Spacing400} 0 ${Spacing.Spacing400};
          `}
        >
          <span>{monthLabel}</span>
          <WeekNavigator
            weekLabel={weekLabel}
            onPreviousWeek={handlePreviousWeek}
            onNextWeek={handleNextWeek}
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
