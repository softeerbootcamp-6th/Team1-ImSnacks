import type { WeatherMetrics } from '@/types/weather.types';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from 'recharts';
import { Typography } from '@/styles/typography';
import { Assets, GrayScale, Opacity } from '@/styles/colors';
import { css } from '@emotion/react';
import { getUnit } from '@/utils/getUnit';
import ToolTip from '@/components/toolTip/ToolTip';

const CustomizedDot = (props: { cx: number; cy: number }) => {
  const { cx, cy } = props;

  return (
    <svg
      x={cx - 9}
      y={cy - 9}
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
    >
      <circle
        cx="9"
        cy="9"
        r="7"
        fill="#88BBF9"
        stroke="#FDFEFE"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
};

interface MainLineChartProps {
  graphData: {
    min: number;
    max: number;
    weatherMetric: WeatherMetrics;
    valuePerTime: Array<{ name: string; value: number }>;
  };
}

const MainLineChart = ({ graphData }: MainLineChartProps) => {
  const pointSpacing = 100;
  const chartWidth = Math.max(
    300,
    (graphData.valuePerTime.length - 1) * pointSpacing + 100
  );

  // Y축 tick 값들 계산
  const generateYTicks = () => {
    const { min, max } = graphData;
    const ticks = [];
    const step = (max - min) / 5; // 6개 tick이므로 5개 간격
    for (let i = 0; i <= 5; i++) {
      ticks.push(Math.round((min + step * i) * 10) / 10);
    }
    return ticks.reverse(); // 위에서부터 아래로
  };

  const yTicks = generateYTicks();

  // 커스텀 Tooltip 컴포넌트
  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: Array<{ value: number; name: string }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <ToolTip
          direction="top"
          content={
            <div style={{ ...Typography.Caption_S, color: GrayScale.G900 }}>
              {`${label}시: ${payload[0].value}${getUnit(
                graphData.weatherMetric
              )}`}
            </div>
          }
        />
      );
    }
    return null;
  };

  return (
    <div
      style={{
        width: '100%',
        position: 'relative',
        // backgroundColor: 'pink',
      }}
    >
      {/* 고정된 Y축 */}
      <div
        style={{
          position: 'absolute',
          right: '0px',
          top: '0px',
          bottom: '0px',
          width: '28px',
          zIndex: 10,
          // pointerEvents: 'none',
          // backgroundColor: 'red',
          marginTop: '8px',
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '20px',
          ...Typography.Caption_S,
          color: Assets.Text.Global.Clear,
        }}
      >
        {getUnit(graphData.weatherMetric)}
        <div
          css={css`
            display: flex;
            height: 250px;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-start;
            align-self: stretch;
          `}
        >
          {yTicks.map(tick => (
            <div
              key={tick}
              style={{
                ...Typography.Caption_S,
                color: Assets.Text.Global.Clear,
              }}
            >
              {tick}
            </div>
          ))}
        </div>
      </div>

      {/* Line Chart */}
      <div
        style={{
          overflowX: 'auto',
          width: 'calc(100% - 44px)',
          // backgroundColor: 'green',
        }}
      >
        <LineChart
          width={chartWidth}
          height={373}
          data={graphData.valuePerTime}
          margin={{
            top: 53,
            right: -40,
            left: 12,
            bottom: 55,
          }}
        >
          <CartesianGrid
            horizontal={true}
            vertical={false}
            stroke={Opacity.White.W200}
            strokeWidth={2}
          />
          <XAxis
            dataKey="name"
            tickLine={false}
            tick={{ fill: Assets.Text.Global.Clear }}
            axisLine={false}
            tickMargin={60}
          />
          <YAxis
            domain={[graphData.min, graphData.max]}
            tickCount={6}
            type="number"
            axisLine={false}
            orientation="right"
            tickLine={false}
            style={{
              display: 'none',
            }}
          />
          <Tooltip
            content={<CustomTooltip />}
            // position={{ x: 0, y: -30 }}
            // offset={-30}
            // cursor={false}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={GrayScale.White}
            strokeWidth={4}
            dot={<CustomizedDot cx={0} cy={0} />}
          />
        </LineChart>
      </div>
    </div>
  );
};

export default MainLineChart;
