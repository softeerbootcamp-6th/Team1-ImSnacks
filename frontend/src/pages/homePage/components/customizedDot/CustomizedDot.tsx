import type { WeatherRiskData } from '@/types/mainGraph.type';

// CustomizedDot 컴포넌트
const CustomizedDot = ({
  cx,
  cy,
  payload,
  weatherRiskData,
  wrapperMargin,
}: {
  cx: number;
  cy: number;
  payload?: { name: string; value: number };
  weatherRiskData: WeatherRiskData[];
  wrapperMargin: { top: number; bottom: number; left: number; right: number };
}) => {
  // 차트의 실제 높이 계산 (전체 높이 - 상단 마진 - 하단 마진)
  const chartHeight = 373;
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

  return (
    <>
      {/* 리스크 세로 경계선 */}
      {hasRiskData && (
        <svg
          x={cx - 1}
          y={cy + 7}
          width={2}
          height={lineHeight - 7}
          viewBox={`0 0 2 ${lineHeight - 7}`}
          fill="none"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient
              id={`paint0_linear_${cx}`}
              x1="2"
              y1="0"
              x2="2"
              y2={lineHeight - 7}
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FDFEFE" />
              <stop offset="1" stopColor="#FDFEFE" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d={`M1 ${lineHeight - 7}L1 0`}
            stroke={`url(#paint0_linear_${cx})`}
            strokeWidth="2"
          />
        </svg>
      )}

      {/* dot */}
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
    </>
  );
};

export default CustomizedDot;
