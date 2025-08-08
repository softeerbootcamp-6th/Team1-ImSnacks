import { CommonStyles, FlexStyles } from '@/styles/commonStyles';
import { Spacing } from '@/styles/spacing';
import { Typography } from '@/styles/typography';
import { css } from '@emotion/react';

const WeatherBoardWeekly = css`
  ${CommonStyles.weatherBoardContainer}
  ${FlexStyles.flexColumn};

  padding: ${Spacing.Spacing400};
  gap: ${Spacing.Spacing400};
  box-sizing: border-box;
  flex-shrink: 0;
`;

const WeeklyTitleWrapper = css`
  ${FlexStyles.flexRow};
  justify-content: center;
  padding: 10px 0;
`;

const WeeklyTitle = css`
  && {
    ${Typography.Body_M_400}
  }
`;

const WeeklyContentContainer = css`
  ${FlexStyles.flexColumn};
  flex: 1 0 0;
  align-self: stretch;
`;

export default {
  WeatherBoardWeekly,
  WeeklyTitleWrapper,
  WeeklyTitle,
  WeeklyContentContainer,
};
