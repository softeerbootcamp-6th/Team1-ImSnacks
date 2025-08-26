import { GrayScale, Opacity } from '@/styles/colors';
import { customBorderGradientStyles } from '@/styles/customBorderGradientStyles';
import { DropShadow } from '@/styles/effects';
import { Spacing } from '@/styles/spacing';
import { Typography } from '@/styles/typography';
import { css } from '@emotion/react';

const MobileHeadline = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  gap: ${Spacing.Spacing300};
  color: ${GrayScale.White};
`;

const MobileGreetingMessage = css`
  ${Typography.Body_L_500}
  word-break: keep-all;
`;

const WeatherRisk = css`
  gap: ${Spacing.Spacing300};
  align-self: stretch;
  border-radius: 16px;
  ${customBorderGradientStyles.gradientBorder};
  background: ${Opacity.White.W200};
  ${DropShadow.Ds200};
  padding: 8px 12px;
`;

const MobileHeadlineWeather = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const MobileHeadlineDate = css`
  color: ${GrayScale.White};
  ${Typography.Body_L_500}
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const MobileHeadlineWeatherIcon = css`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
`;

export default {
  MobileHeadline,
  MobileGreetingMessage,
  WeatherRisk,
  MobileHeadlineWeather,
  MobileHeadlineDate,
  MobileHeadlineWeatherIcon,
};
