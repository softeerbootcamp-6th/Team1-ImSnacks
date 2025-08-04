import { Assets, GrayScale, Opacity } from '@/styles/colors';
import { Spacing } from '@/styles/spacing';
import { Typography } from '@/styles/typography';
import { css } from '@emotion/react';

const Headline = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
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
  border-radius: 8px;
  border: 2px solid rgba(253, 254, 254, 0.4);
  background: ${Opacity.White.W100};
  box-shadow: 3px 0 4px 0 rgba(116, 98, 98, 0.08) inset,
    0 3px 4px 0 rgba(0, 0, 0, 0.08) inset;
  padding: 2px 16px;
`;

const HeadlineWeather = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: ${Spacing.Spacing900};
`;

const HeadlineDate = css`
  color: ${GrayScale.White};
  ${Typography.Body_L_500}
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export default {
  Headline,
  GreetingMessage,
  WeatherRisk,
  WeatherRiskText,
  HeadlineWeather,
  HeadlineDate,
};
