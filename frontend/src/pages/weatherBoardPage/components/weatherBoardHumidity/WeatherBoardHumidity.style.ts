import { GrayScale } from '@/styles/colors';
import { CommonStyles, FlexStyles } from '@/styles/commonStyles';
import { Typography } from '@/styles/typography';
import { css } from '@emotion/react';

const WeatherBoardHumidity = css`
  ${CommonStyles.weatherBoardContainer};
  ${FlexStyles.flexColumn};
  justify-content: flex-end;
  position: relatvie;
`;

const WeatherBoardTitleWrapper = css`
  ${FlexStyles.flexColumn};
  margin-bottom: 56px;
`;

const HumidityRangeTextWrapper = css`
  width: 176px;
  ${FlexStyles.flexRow}
  justify-content: space-between;
  margin-bottom: 40px;
`;

const HumidityRangeText = css`
  ${Typography.Caption_S};
  color: ${GrayScale.G800};
`;

const HumidityIconWrapper = css`
  position: absolute;
  top: 2px;
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  &:hover {
    transform: scale(1.05);
  }
`;

export default {
  WeatherBoardHumidity,
  WeatherBoardTitleWrapper,
  HumidityRangeTextWrapper,
  HumidityRangeText,
  HumidityIconWrapper,
};
