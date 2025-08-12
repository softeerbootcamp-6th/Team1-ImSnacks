import { GrayScale } from '@/styles/colors';
import { CommonStyles, FlexStyles } from '@/styles/commonStyles';
import { Typography } from '@/styles/typography';
import { css } from '@emotion/react';

const WeatherBoardUV = css`
  ${CommonStyles.weatherBoardContainer}
  position: relative;
  padding-bottom: 12px;
  box-sizing: border-box;
`;

const WeatherBoardUVTitle = css`
  position: absolute;
  top: 16px;
  left: 20px;
`;

const WeatherBoardUVContent = css`
  ${FlexStyles.flexColumn};
  justify-content: flex-end;
  height: 100%;
`;

const WeatherBoardUVSvg = css`
  margin-bottom: 6px;

  @keyframes drawPath {
    from {
      stroke-dasharray: 1000;
      stroke-dashoffset: 1000;
    }
    to {
      stroke-dasharray: 1000;
      stroke-dashoffset: 0;
    }
  }
`;

const WeatherBoardUVPath = css`
  animation: drawPath 2s ease-out forwards;
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
`;

const WeatherBoardUVTimeWrapper = css`
  ${FlexStyles.flexRow};
  justify-content: space-between;
  width: 228px;
`;

const WeatherBoardUVTime = css`
  ${Typography.Body_S_400};
  color: ${GrayScale.White};
`;

export default {
  WeatherBoardUV,
  WeatherBoardUVTitle,
  WeatherBoardUVContent,
  WeatherBoardUVSvg,
  WeatherBoardUVPath,
  WeatherBoardUVTimeWrapper,
  WeatherBoardUVTime,
};
