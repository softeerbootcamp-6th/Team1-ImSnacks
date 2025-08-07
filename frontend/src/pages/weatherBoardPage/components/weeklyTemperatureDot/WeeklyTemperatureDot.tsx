import { FLAT_ICON } from '@/constants/flatIcons';
import { Typography } from '@/styles/typography';
import { getTemperatureColor } from '../../utils/weeklyTemperatureUtil';

const WeeklyTemperatureDot = ({
  cx,
  cy,
  payload,
}: {
  cx: number;
  cy: number;
  payload?: { time: string; temperature: number; weather: string };
}) => {
  const DOT_SIZE = 6;

  const dotColor = payload
    ? getTemperatureColor(payload.temperature)
    : '#F6695A';
  const FlatIconComponent = payload?.weather
    ? FLAT_ICON[payload.weather as keyof typeof FLAT_ICON]
    : null;

  return (
    <>
      {payload && FlatIconComponent && (
        <foreignObject x={cx - 17} y={cy - 50} width={40} height={66}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: 'white',
            }}
          >
            <FlatIconComponent width={20} height={20} />
            <span css={Typography.Body_S_400}>{payload.temperature}°</span>
          </div>
        </foreignObject>
      )}

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
          r={DOT_SIZE / 2}
          fill={dotColor}
        />
      </svg>
    </>
  );
};

export default WeeklyTemperatureDot;
