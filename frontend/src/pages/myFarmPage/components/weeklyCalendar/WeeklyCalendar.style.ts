import { css } from '@emotion/react';
import { Spacing } from '@/styles/spacing';
import { GrayScale, ColorStatus, ColorPrimary, Opacity } from '@/styles/colors';
import { Typography } from '@/styles/typography';
import { BorderRadius } from '@/styles/borderRadius';
import { customBorderGradientStyles } from '@/styles/customBorderGradientStyles';
import { FlexStyles } from '@/styles/commonStyles';

const getDayColor = (dayName: string, isToday = false) => {
  if (isToday) return GrayScale.White;
  if (dayName === '일') return ColorStatus.Global.Red;
  if (dayName === '토') return ColorPrimary.B700;
  return GrayScale.G900;
};

const WeeklyCalendar = css`
  display: flex;
  height: 714px;
  flex-direction: column;
  gap: ${Spacing.Spacing200};
  border-radius: ${BorderRadius.Base.S_Hard};
  background-color: ${Opacity.White.W800};
  ${customBorderGradientStyles.gradientBorder}
`;

const DayContainer = css`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  height: 100%;
  gap: ${Spacing.Spacing100};
`;

const DateInfoContainer = css`
  ${FlexStyles.flexColumn}
  justify-content: center;
  gap: ${Spacing.Spacing100};
  width: 100%;
  border-bottom: 1px solid ${GrayScale.G300};
  padding: ${Spacing.Spacing200} 0;
`;

const DateContainer = css`
  border-right: 1px solid ${GrayScale.G300};
  height: 100%;
  ${FlexStyles.flexColumn}
`;

const DateNumberContainer = (dayName: string, isToday = false) => css`
  width: 36px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${BorderRadius.Base.Hard};
  ${Typography.Body_L_500}
  background-color: ${isToday ? ColorPrimary.B400 : 'transparent'};
  color: ${getDayColor(dayName, isToday)};
`;

const DayNameContainer = (dayName: string) => css`
  text-align: center;
  ${Typography.Body_S_400}
  color: ${getDayColor(dayName)};
`;

const DateWorkContainer = css`
  display: flex;
  flex-direction: column;
  padding: ${Spacing.Spacing200};
  gap: ${Spacing.Spacing200};
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

export default {
  WeeklyCalendar,
  DayContainer,
  DateContainer,
  DateInfoContainer,
  DateNumberContainer,
  DayNameContainer,
  DateWorkContainer,
};
