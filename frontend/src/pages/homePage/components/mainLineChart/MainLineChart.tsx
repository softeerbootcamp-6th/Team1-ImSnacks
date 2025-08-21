import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
} from 'recharts';
import { useRef } from 'react';
import { Assets, GrayScale, Opacity } from '@/styles/colors';
import { getProcessedData } from '../../utils/lineChartUtil';
import S from './MainLineChart.style';
import CustomizedDot from '../customizedDot/CustomizedDot';
import WeatherRiskText from '../weatherRiskText/WeatherRiskText';
import PortalTooltipWrapper from '../portalTooltipWrapper/PortalTooltipWrapper';
import type {
  GetWeatherGraphResponse,
  WeatherRiskDto,
} from '@/types/openapiGenerator';

const MainLineChart = ({
  graphData,
  weatherRiskData,
}: {
  graphData?: GetWeatherGraphResponse;
  weatherRiskData: WeatherRiskDto[];
}) => {
  const chartRef = useRef<HTMLDivElement>(null);

  if (!graphData || !graphData.valuePerTime) {
    return <div css={S.LoadingWrapper}>로딩 중...</div>;
  }

  const pointSpacing = 97;
  const chartWidth = Math.max(
    300,
    graphData.valuePerTime?.length * pointSpacing
  );

  const GraphHighlight = (
    <defs>
      <linearGradient id="customGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="rgba(253, 254, 254, 0.40)" />
        <stop offset="60%" stopColor="rgba(253, 254, 254, 0.20)" />
        <stop offset="88%" stopColor="rgba(253, 254, 254, 0.00)" />
      </linearGradient>
    </defs>
  );

  const processedData = getProcessedData(graphData, weatherRiskData ?? []);

  const WRAPPER_MARGIN = {
    top: 53,
    right: -40,
    left: 12,
    bottom: 55,
  };
  const CHART_HEIGHT = 373;

  return (
    <div css={S.MainLineChart}>
      {/* <div css={S.LineChartScrollWrapper}> */}
      <div css={S.LineChartInnerWrapper(chartWidth)} ref={chartRef}>
        <ComposedChart
          width={chartWidth}
          height={CHART_HEIGHT}
          data={processedData}
          margin={WRAPPER_MARGIN}
        >
          {GraphHighlight}
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
            domain={[
              graphData.min !== undefined ? graphData.min : 0,
              graphData.max !== undefined ? graphData.max : 100,
            ]}
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
            content={props => (
              <PortalTooltipWrapper
                {...props}
                graphData={graphData}
                chartRef={chartRef}
              />
            )}
            allowEscapeViewBox={{ x: true, y: true }}
            wrapperStyle={{ visibility: 'hidden' }}
          />

          {weatherRiskData.map((item, index) => (
            <Area
              key={item.category}
              type="monotone"
              dataKey={`areaValue_${index}`}
              stroke="transparent"
              fill="url(#customGradient)"
            />
          ))}
          <Line
            type="monotone"
            dataKey="value"
            stroke={GrayScale.White}
            strokeWidth={4}
            dot={
              <CustomizedDot
                cx={0}
                cy={0}
                weatherRiskData={weatherRiskData}
                wrapperMargin={WRAPPER_MARGIN}
                chartHeight={CHART_HEIGHT}
              />
            }
          />
        </ComposedChart>

        {weatherRiskData.map((riskData, index) => (
          <WeatherRiskText
            key={`weatherRisk_${index}`}
            riskData={riskData}
            graphData={graphData}
            index={index}
            pointSpacing={pointSpacing}
          />
        ))}
      </div>
    </div>
    // </div>
  );
};

export default MainLineChart;
