import { GrayScale } from '@/styles/colors';
import { Typography } from '@/styles/typography';
import { css } from '@emotion/react';

const WeeklyContent = css`
  display: flex;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  gap: var(--Spacing-300, 8px);
  flex: 1 0 0;
  align-self: stretch;
`;

const WeeklyTitle = css`
  color: ${GrayScale.White};
  ${Typography.Body_S_400}
  flex: 1 0 0;
`;

const WeeklyWeatherIconWrapper = css`
  display: flex;
  padding: 8px;
  align-items: center;
  gap: 10px;
`;

const WeeklyTemperature = css`
  color: ${GrayScale.White};
  ${Typography.Body_S_400}
  flex: 1 0 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 2px;
  flex: 1 0 0;
`;

export default {
  WeeklyContent,
  WeeklyTitle,
  WeeklyWeatherIconWrapper,
  WeeklyTemperature,
};
