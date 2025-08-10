import { GrayScale } from '@/styles/colors';
import { CommonStyles, FlexStyles } from '@/styles/commonStyles';
import { Typography } from '@/styles/typography';
import { css } from '@emotion/react';

const WeatherBoardSunset = css`
  ${CommonStyles.weatherBoardContainer}
  position: relative;
  ${FlexStyles.flexColumn}
  justify-content: flex-end;
  padding-bottom: 12px;
  box-sizing: border-box;
`;

const WeatherBoardSunsetTitle = css`
  position: absolute;
  top: 16px;
  left: 20px;
`;

const WeatherBoardSunsetContent = css`
  position: relative;
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 6px;
`;

const WeatherBoardSunsetSvg = css`
  z-index: 2;
  overflow: visible;
  width: 242px;
  height: 121px;
`;

const WeatherBoardSunsetBaseLine = css`
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  height: 1px;
  background: ${GrayScale.G900};
  z-index: 1;
`;

const WeatherBoardSunsetTimeWrapper = css`
  ${FlexStyles.flexRow};
  justify-content: space-between;
  width: 282px;
`;

const WeatherBoardSunsetTime = css`
  ${Typography.Body_S_400};
  color: ${GrayScale.White};
`;

export default {
  WeatherBoardSunset,
  WeatherBoardSunsetTitle,
  WeatherBoardSunsetContent,
  WeatherBoardSunsetSvg,
  WeatherBoardSunsetBaseLine,
  WeatherBoardSunsetTimeWrapper,
  WeatherBoardSunsetTime,
};
