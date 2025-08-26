import MyFarmHeader from '../myFarmHeader/MyFarmHeader';
import WeeklyCalendar from '../weeklyCalendar/WeeklyCalendar';
import WeekNavigator from '../weekNavigator/WeekNavigator';
import { useWeeklyWorkSchedule } from '../../hooks/useWeeklyWorkSchedule';
import { useMyWorkOfWeekly } from '../../hooks/useMyWorkOfWeekly';
import S from './WorkSchedule.style';
import { GrayScale, Opacity } from '@/styles/colors';
import { Typography } from '@/styles/typography';
import { BorderRadius } from '@/styles/borderRadius';
import { Spacing } from '@/styles/spacing';
import { css } from '@emotion/react';
import { customBorderGradientStyles } from '@/styles/customBorderGradientStyles';

const WorkSchedule = () => {
  const {
    weekDates,
    handlePreviousWeek,
    handleNextWeek,
    weekLabel,
    monthLabel,
  } = useWeeklyWorkSchedule();

  const {
    myWorkOfWeekly,
    isExpanded,
    handleExpandClick,
    hasMoreWorks,
    handleCheckButton,
  } = useMyWorkOfWeekly(weekDates);

  return (
    <div css={S.WorkScheduleContainer}>
      <MyFarmHeader title="작업 이력" />
      <div css={S.WorkScheduleContent(isExpanded)}>
        <div css={S.WorkScheduleHeader}>
          <span>{monthLabel}</span>
          <WeekNavigator
            weekLabel={weekLabel}
            onPreviousWeek={() => handlePreviousWeek(1)}
            onNextWeek={() => handleNextWeek(1)}
          />
        </div>
        <WeeklyCalendar
          weekDates={weekDates}
          workScheduleDataByDate={myWorkOfWeekly ?? {}}
          isExpanded={isExpanded}
          hasMoreWorks={hasMoreWorks}
          handleCheckButton={handleCheckButton}
        />
      </div>
      {hasMoreWorks && (
        <button
          onClick={handleExpandClick}
          css={css`
            ${Typography.Body_L_500}
            color: ${GrayScale.White};
            background-color: ${Opacity.White.W100};
            ${customBorderGradientStyles.gradientBorder}
            border-radius: ${BorderRadius.Base.S_Hard};
            padding: ${Spacing.Spacing200} ${Spacing.Spacing300};
            margin: ${Spacing.Spacing800} auto;
          `}
        >
          {isExpanded ? '접기' : '더보기'}
        </button>
      )}
    </div>
  );
};

export default WorkSchedule;
