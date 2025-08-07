import { Assets } from '@/styles/colors';
import { Typography } from '@/styles/typography';
import { css } from '@emotion/react';

const MainLineChart = css`
  width: 100%;
  position: relative;
`;

const FixedYAxisWrapper = css`
  position: absolute;
  right: 0px;
  top: 0px;
  bottom: 0px;
  width: 28px;
  z-index: 10;
  margin-top: 8px;
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  ${Typography.Caption_S};
  color: ${Assets.Text.Global.Clear};
`;

const YAxis = css`
  display: flex;
  height: 250px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
`;

const YAxisTick = css`
  ${Typography.Caption_S};
  color: ${Assets.Text.Global.Clear};
`;

const LineChartScrollWrapper = css`
  overflow-x: auto;
  overflow-y: hidden;
  width: calc(100% - 44px);
  height: 373px;
  position: relative;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const LineChartInnerWrapper = (chartWidth: number) => css`
  width: ${chartWidth}px;
  height: 373px;
  position: relative;
`;

export default {
  MainLineChart,
  FixedYAxisWrapper,
  YAxis,
  YAxisTick,
  LineChartScrollWrapper,
  LineChartInnerWrapper,
};
