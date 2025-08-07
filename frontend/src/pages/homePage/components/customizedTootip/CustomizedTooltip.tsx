import ToolTip from '@/components/toolTip/ToolTip';
import { Assets } from '@/styles/colors';
import { Typography } from '@/styles/typography';
import type { MainGraphData } from '@/types/mainGraph.type';
import { TOOLTIP_DIRECTIONS, TOOLTIP_TYPES } from '@/types/tooltip.type';
import { getUnit } from '@/utils/getUnit';
import { css } from '@emotion/react';

const CustomTooltip = ({
  active,
  payload,
  label,
  graphData,
}: {
  active?: boolean;
  payload?: Array<{ value: number; name: string }>;
  label?: string;
  graphData: MainGraphData;
}) => {
  if (active && payload && payload.length) {
    return (
      <ToolTip
        direction={TOOLTIP_DIRECTIONS.TOP}
        content={
          <div
            css={css`
              ${Typography.Caption};
              color: ${Assets.Text.ToolTip.Default};
            `}
          >
            {`${label}:00 | ${payload[0].value}${getUnit(
              graphData.weatherMetric
            )}`}
          </div>
        }
        type={TOOLTIP_TYPES.DEFAULT}
        isAbsolute={false}
      />
    );
  }
  return null;
};

export default CustomTooltip;
