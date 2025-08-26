import { FlexStyles } from '@/styles/flexStyles';
import S from '@/pages/weatherBoardPage/WeatherBoardCommon.style';
import { Typography } from '@/styles/typography';
import { css } from '@emotion/react';

const WeatherBoardDust = css`
  ${S.WeatherBoardContainer};
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

const DustChartRow = css`
  ${FlexStyles.flexRow};
  justify-content: flex-end;
  width: 100%;
  position: relative;
`;

const DustChartWrapper = css`
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  &:hover {
    transform: scale(1.1);
  }
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
  DustChartRow,
  DustChartWrapper,
  DustValueWrapper,
  DustValue,
  DustUnit,
};
