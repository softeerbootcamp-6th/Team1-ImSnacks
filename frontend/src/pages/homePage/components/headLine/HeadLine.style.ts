import { Assets, GrayScale, Opacity } from '@/styles/colors';
import { customBorderGradientStyles } from '@/styles/customBorderGradientStyles';
import { DropShadow } from '@/styles/effects';
import { Spacing } from '@/styles/spacing';
import { Typography } from '@/styles/typography';
import { css } from '@emotion/react';

const Headline = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 124px;
  position: relative;
  margin-bottom: ${Spacing.Spacing800};
`;

const GreetingMessage = css`
  color: ${Assets.Text.Global.Clear};
  ${Typography.Headline}
  gap: ${Spacing.Spacing400};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const WeatherRisk = css`
  gap: ${Spacing.Spacing300};
  align-self: stretch;
`;

const WeatherRiskText = css`
  border-radius: 12px;
  ${customBorderGradientStyles.gradientBorder};
  background: ${Opacity.White.W200};
  ${DropShadow.Ds200};
  padding: 2px 16px;
`;

const HeadlineWeather = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const HeadlineDate = css`
  color: ${GrayScale.White};
  ${Typography.Body_L_500}
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 200px;
`;

const HeadlineWeatherIcon = css`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
`;

export default {
  Headline,
  GreetingMessage,
  WeatherRisk,
  WeatherRiskText,
  HeadlineWeather,
  HeadlineDate,
  HeadlineWeatherIcon,
};
