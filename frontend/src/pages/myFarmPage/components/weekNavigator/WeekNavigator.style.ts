import { GrayScale, Opacity } from '@/styles/colors';
import { BorderRadius } from '@/styles/borderRadius';
import { Spacing } from '@/styles/spacing';
import { css } from '@emotion/react';
import { Typography } from '@/styles/typography';

const WeeklyNavigator = css`
  display: flex;
  min-width: 120px;
  height: 32px;
  align-items: center;
  justify-content: space-between;

  background-color: ${Opacity.White.W300};
  ${Typography.Body_S_400}
  padding: ${Spacing.Spacing200};
  gap: ${Spacing.Spacing200};
  border-radius: ${BorderRadius.Base.Hard};
`;

const onNextWeekButton = css`
  background: none;
  border: none;

  cursor: pointer;
  padding: ${Spacing.Spacing100};
  border-radius: ${BorderRadius.Base.Hard};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${Opacity.White.W200};
  }
`;

const onPreviousWeekButton = css`
  background: none;
  border: none;
  color: ${GrayScale.White};
  cursor: pointer;
  padding: ${Spacing.Spacing100};
  border-radius: ${BorderRadius.Base.Hard};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${Opacity.White.W200};
  }
`;

export default {
  WeeklyNavigator,
  onNextWeekButton,
  onPreviousWeekButton,
};
