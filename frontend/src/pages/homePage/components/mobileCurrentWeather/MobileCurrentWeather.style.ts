import { GrayScale, Opacity } from '@/styles/colors';
import { FlexStyles } from '@/styles/commonStyles';
import { customBorderGradientStyles } from '@/styles/customBorderGradientStyles';
import { Spacing } from '@/styles/spacing';
import { css } from '@emotion/react';

const MobileCurrentWeather = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${Spacing.Spacing300};
  align-self: stretch;
  color: ${GrayScale.White};
`;

const MobileCurrentWeatherContentWrapper = css`
  ${FlexStyles.flexColumn};
  justify-content: center;
  align-self: stretch;
  padding: ${Spacing.Spacing500} ${Spacing.Spacing700};
  border-radius: 16px;
  ${customBorderGradientStyles.gradientBorder};
  background: ${Opacity.White.W200};
  gap: ${Spacing.Spacing400};
`;

const MobileCurrentWeatherContentRow = css`
  ${FlexStyles.flexRow};
  justify-content: space-between;
  width: 100%;
  gap: 29px;
`;

export default {
  MobileCurrentWeather,
  MobileCurrentWeatherContentWrapper,
  MobileCurrentWeatherContentRow,
};
