import { GrayScale } from '@/styles/colors';
import type { WeatherRiskDto } from '@/types/openapiGenerator';
import { useTheme } from '@emotion/react';
import { useEffect } from 'react';

const DOT_SIZE = 18;
const DOT_RADIUS = 7;
const DOT_STROKE_WIDTH = 3;
const LINE_STROKE_WIDTH = 2;
const LINE_WIDTH = 2;
const LINE_VERTICAL_OFFSET = 7;
const LINE_HORIZONTAL_OFFSET = 1;

const CustomizedDot = ({
  cx = 0,
  cy = 0,
  index,
  payload,
  weatherRiskData,
  wrapperMargin,
  chartHeight,
  onLayout,
}: {
  cx?: number;
  cy?: number;
  index?: number;
  payload?: { name: string; value: number };
  weatherRiskData: WeatherRiskDto[];
  wrapperMargin: { top: number; bottom: number; left: number; right: number };
  chartHeight: number;
  onLayout?: (name: string, index: number, cx: number, cy: number) => void;
}) => {
  const theme = useTheme();
  // 차트의 실제 높이 계산 (전체 높이 - 상단 마진 - 하단 마진)
  const topMargin = wrapperMargin.top;
  const bottomMargin = wrapperMargin.bottom;
  const availableHeight = chartHeight - topMargin - bottomMargin;
  const lineHeight = availableHeight - (cy - topMargin);

  // weatherRiskData에서 현재 시간에 해당하는 item이 있는지 확인
  const hasRiskData =
    payload &&
    weatherRiskData.some(
      riskData =>
        riskData.startTime === payload.name || riskData.endTime === payload.name
    );

  useEffect(() => {
    if (
      onLayout &&
      payload?.name != null &&
      typeof index === 'number' &&
      typeof cx === 'number' &&
      typeof cy === 'number'
    ) {
      onLayout(String(payload.name), index, cx, cy);
    }
  }, [onLayout, payload?.name, index, cx, cy]);

  return (
    <>
      {/* 리스크 세로 경계선 */}
      {hasRiskData && (
        <svg
          x={cx - LINE_HORIZONTAL_OFFSET}
          y={cy + LINE_VERTICAL_OFFSET}
          width={LINE_WIDTH}
          height={lineHeight - LINE_VERTICAL_OFFSET}
          viewBox={`0 0 ${LINE_WIDTH} ${lineHeight - LINE_VERTICAL_OFFSET}`}
          fill="none"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient
              id={`paint0_linear_${cx}`}
              x1="2"
              y1="0"
              x2="2"
              y2={lineHeight - LINE_VERTICAL_OFFSET}
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FDFEFE" />
              <stop offset="1" stopColor="#FDFEFE" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d={`M1 ${lineHeight - LINE_VERTICAL_OFFSET}L1 0`}
            stroke={`url(#paint0_linear_${cx})`}
            strokeWidth={LINE_STROKE_WIDTH}
          />
        </svg>
      )}

      {/* dot */}
      <svg
        x={cx - DOT_SIZE / 2}
        y={cy - DOT_SIZE / 2}
        width={DOT_SIZE}
        height={DOT_SIZE}
        viewBox={`0 0 ${DOT_SIZE} ${DOT_SIZE}`}
        fill="none"
      >
        <circle
          cx={DOT_SIZE / 2}
          cy={DOT_SIZE / 2}
          r={DOT_RADIUS}
          fill={theme.ColorPrimary.B300}
          stroke={GrayScale.White}
          strokeWidth={DOT_STROKE_WIDTH}
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
};

export default CustomizedDot;
