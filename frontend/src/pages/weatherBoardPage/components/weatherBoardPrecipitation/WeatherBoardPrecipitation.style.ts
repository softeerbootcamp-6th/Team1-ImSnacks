import { CommonStyles, FlexStyles } from '@/styles/commonStyles';
import { css } from '@emotion/react';

const WeatherBoardPrecipitation = css`
  ${CommonStyles.weatherBoardContainer}
  padding: 10px;
  ${FlexStyles.flexColumn}
  justify-content: flex-end;
  position: relative;
  box-sizing: border-box;
`;

const WeatherBoardPrecipitationTitle = css`
  position: absolute;
  top: 20px;
  right: 17px;
  text-align: right;
  z-index: 1;
`;

const WeatherBoardPrecipitationSvg = css`
  animation: fillUp 1s ease-out;
  clip-path: inset(100% 0 0 0);
  animation-fill-mode: forwards;

  @keyframes fillUp {
    from {
      clip-path: inset(100% 0 0 0);
    }
    to {
      clip-path: inset(0% 0 0 0);
    }
  }
`;

export default {
  WeatherBoardPrecipitation,
  WeatherBoardPrecipitationTitle,
  WeatherBoardPrecipitationSvg,
};
