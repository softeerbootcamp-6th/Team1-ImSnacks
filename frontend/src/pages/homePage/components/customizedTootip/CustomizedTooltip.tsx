import ToolTip from '@/components/toolTip/ToolTip';
import { Assets } from '@/styles/colors';
import { Typography } from '@/styles/typography';
import type { GetWeatherGraphResponse } from '@/types/openapiGenerator';
import { TOOLTIP_DIRECTIONS, TOOLTIP_TYPES } from '@/types/tooltip.type';
import { getUnit } from '@/utils/getUnit';
import { css } from '@emotion/react';

const CustomTooltip = ({
  active,
  payload,
  label,
  graphData,
  coordinate,
}: {
  active?: boolean;
  payload?: Array<{ value: number; name: string }>;
  label?: string;
  graphData: GetWeatherGraphResponse;
  coordinate: { x: number; y: number };
}) => {
  if (
    !active ||
    !payload ||
    payload.length === 0 ||
    !graphData?.weatherMetric
  ) {
    return null;
  }

  const { x, y } = coordinate;

  return (
    <div
      css={css`
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 9999;
      `}
    >
      <ToolTip
        direction={TOOLTIP_DIRECTIONS.TOP}
        content={
          <div
            css={css`
              ${Typography.Caption};
              color: ${Assets.Text.ToolTip.Default};
            `}
          >
            {`${label ?? ''}:00 | ${payload[0]?.value ?? 0}${getUnit(
              graphData.weatherMetric
            )}`}
          </div>
        }
        type={TOOLTIP_TYPES.DEFAULT}
        isAbsolute={false}
      />
    </div>
  );
};

export default CustomTooltip;
