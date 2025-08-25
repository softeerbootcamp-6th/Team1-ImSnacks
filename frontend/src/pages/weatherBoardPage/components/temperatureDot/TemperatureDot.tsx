import { FLAT_ICON } from '@/constants/flatIcons';
import { Typography } from '@/styles/typography';
import { getTemperatureColor } from '../../utils/temperatureUtil';
import { FlexStyles } from '@/styles/commonStyles';
import type { TemperaturePerTime } from '@/types/openapiGenerator/models/all';
import { css } from '@emotion/react';
import { useState } from 'react';

const TemperatureDot = ({
  cx,
  cy,
  payload,
}: {
  cx: number;
  cy: number;
  payload?: TemperaturePerTime;
}) => {
  const DOT_SIZE = 6;

  const dotColor = payload
    ? getTemperatureColor(payload?.value ?? 0)
    : '#F6695A';
  const FlatIconComponent = payload?.weatherType
    ? FLAT_ICON[payload.weatherType as keyof typeof FLAT_ICON]
    : null;

  const [hovered, setHovered] = useState(false);
  const scale = hovered ? 1.2 : 1;
  return (
    <g
      pointerEvents="all"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      css={css`
        transform: translate(${cx}px, ${cy}px) scale(${scale})
          translate(${-cx}px, ${-cy}px);
        transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      `}
      onMouseDown={e => e.preventDefault()}
    >
      {payload && FlatIconComponent && (
        <foreignObject x={cx - 17} y={cy - 50} width={40} height={66}>
          <div css={FlexStyles.flexColumn}>
            <FlatIconComponent width={20} height={20} />
            <span css={Typography.Body_S_400}>{payload?.value}°</span>
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
    </g>
  );
};

export default TemperatureDot;
