import { Assets } from '@/styles/colors';
import { Typography } from '@/styles/typography';
import { css } from '@emotion/react';

const MainLineChart = css`
  width: 100%;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 44px;
    width: 25px;
    height: 90%;
    background: linear-gradient(to left, rgba(255, 255, 255, 0.1), transparent);
    pointer-events: none;
    z-index: 5;
  }
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

// TODO: 일단 현재는 미사용, 나중에 스크롤 스타일 수정 필요
// const LineChartScrollWrapper = css`
//   overflow-y: hidden;
//   width: calc(100% - 44px);
//   height: 373px;

//   &::-webkit-scrollbar {
//     display: none;
//   }
// `;

const LineChartInnerWrapper = (chartWidth: number) => css`
  width: ${chartWidth}px;
  height: 373px;
`;

export default {
  MainLineChart,
  FixedYAxisWrapper,
  YAxis,
  YAxisTick,
  // LineChartScrollWrapper,
  LineChartInnerWrapper,
};
