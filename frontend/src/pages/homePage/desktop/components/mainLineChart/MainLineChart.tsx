import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
} from 'recharts';
import { useEffect, useRef, useState } from 'react';
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
import { CircularSpinner } from '@/components/common/CircularSpinner';
import { useMainLineChartCoords } from '../../hooks/useMainLineChartCoords';

const MainLineChart = ({
  graphData,
  weatherRiskData,
  isError = false,
}: {
  graphData?: GetWeatherGraphResponse;
  weatherRiskData: WeatherRiskDto[];
  isError?: boolean;
}) => {
  const chartRef = useRef<HTMLDivElement>(null);

  const [showChart, setShowChart] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShowChart(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const { captureDot, handleLineAnimEnd, getDotX } = useMainLineChartCoords(
    graphData!
  );

  if (!graphData || !graphData.valuePerTime) {
    return (
      <div css={S.LoadingWrapper}>
        <CircularSpinner />
      </div>
    );
  }
  const processedData = getProcessedData(graphData, weatherRiskData ?? []);

  if (isError) {
    return <div css={S.LoadingWrapper}>데이터를 불러오는데 실패했습니다</div>;
  }
  if (!showChart) {
    return <div css={S.LoadingWrapper}></div>;
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

  const WRAPPER_MARGIN = {
    top: 53,
    right: -40,
    left: 12,
    bottom: 55,
  };
  const CHART_HEIGHT = 373;

  return (
    <div css={S.MainLineChart}>
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
              key={item.startTime}
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
            onAnimationEnd={handleLineAnimEnd}
            dot={
              <CustomizedDot
                onLayout={captureDot}
                weatherRiskData={weatherRiskData}
                wrapperMargin={WRAPPER_MARGIN}
                chartHeight={CHART_HEIGHT}
              />
            }
          />
        </ComposedChart>

        {weatherRiskData.map((riskData, index) => {
          const startX = getDotX(riskData.startTime!);
          const endX = getDotX(riskData.endTime!);
          if (startX === null || endX === null) return null; // 값 생기면 다음 렌더에서 나타남
          return (
            <WeatherRiskText
              key={`weatherRisk_${index}`}
              category={riskData.category!}
              index={index}
              startX={startX}
              endX={endX}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MainLineChart;
