import { Typography } from '@/styles/typography';
import { css } from '@emotion/react';

const MobileCurrentWeatherContent = css`
  display: flex;
  align-items: flex-end;

  justify-content: space-between;
  flex: 1;

  position: relative;

  h3 {
    ${Typography.Caption_S};
  }
  p {
    ${Typography.Mobile_Headline};
  }
`;

const MobileCurrentWeatherIcon = css`
  position: absolute;
  bottom: 4px;
  right: 4px;
`;

export default {
  MobileCurrentWeatherContent,
  MobileCurrentWeatherIcon,
};
