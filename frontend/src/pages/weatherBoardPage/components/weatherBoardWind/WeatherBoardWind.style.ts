import { CommonStyles, FlexStyles } from '@/styles/commonStyles';
import { css } from '@emotion/react';
import { getArrowPosition } from '../../utils/windUtil';

const WeatherBoardWind = css`
  ${CommonStyles.weatherBoardContainer}
  ${FlexStyles.flexColumn}
  padding-top: 32px;
  box-sizing: border-box;
`;

const WeatherBoardWindContent = css`
  margin: 11px 0 17px 0;
  height: 108px;
  width: 108px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const WindArrow = (degree: number) => css`
  ${getArrowPosition(degree)};
  position: absolute;
  top: 50%;
`;

export default {
  WeatherBoardWind,
  WeatherBoardWindContent,
  WindArrow,
};
