import { Assets } from '@/styles/colors';
import { Typography } from '@/styles/typography';
import { css } from '@emotion/react';

const WeatherRiskText = (centerX: number) => css`
  position: absolute;
  left: ${centerX}px;
  top: 305px;
  ${Typography.Body_M_400};
  color: ${Assets.Text.Global.Clear};
  pointer-events: none;
  white-space: nowrap;
  transform: translateX(-50%);
`;

export default {
  WeatherRiskText,
};
