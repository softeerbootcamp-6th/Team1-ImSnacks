import { CommonStyles, FlexStyles } from '@/styles/commonStyles';
import { Typography } from '@/styles/typography';
import { css } from '@emotion/react';

const WeatherBoardDust = css`
  ${CommonStyles.weatherBoardContainer};
  ${FlexStyles.flexRow};
  justify-content: space-between;
  padding: 16px 20px;
  gap: 20px;
  box-sizing: border-box;
`;

const DustSection = css`
  ${FlexStyles.flexColumn};
  align-items: flex-start;
  flex: 1;
  height: 100%;
`;

const DustChartWrapper = css`
  ${FlexStyles.flexRow};
  justify-content: flex-end;
  width: 100%;
  position: relative;
`;

const DustValueWrapper = css`
  ${FlexStyles.flexColumn};
  position: absolute;
  top: 26%;
  right: 18%;
`;

const DustValue = css`
  ${Typography.Body_M_400};
`;

const DustUnit = css`
  ${Typography.Caption_S};
`;

export default {
  WeatherBoardDust,
  DustSection,
  DustChartWrapper,
  DustValueWrapper,
  DustValue,
  DustUnit,
};
