import S from '@/pages/weatherBoardPage/WeatherBoardCommon.style';
import { css } from '@emotion/react';

const WeatherBoardTemperature = css`
  ${S.WeatherBoardContainer}
  position: relative;
  padding: 8px 0;
  box-sizing: border-box;
  align-items: flex-end;
  pointer-events: none;
`;

const WeatherBoardTemperatureTitle = css`
  position: absolute;
  top: 16px;
  left: 20px;
`;

export default {
  WeatherBoardTemperature,
  WeatherBoardTemperatureTitle,
};
