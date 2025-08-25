import { memo } from 'react';
import { createPortal } from 'react-dom';
import { css } from '@emotion/react';
import CustomTooltip from '../customizedTootip/CustomizedTooltip';
import type { GetWeatherGraphResponse } from '@/types/openapiGenerator';

interface PortalTooltipWrapperProps {
  active?: boolean;
  payload?: Array<{ value: number; name: string }>;
  label?: string | number;
  coordinate?: { x: number; y: number };
  graphData: GetWeatherGraphResponse;
  chartRef: React.RefObject<HTMLDivElement | null>;
}

const PortalTooltipWrapper = memo(
  ({
    active,
    payload,
    label,
    coordinate,
    graphData,
    chartRef,
  }: PortalTooltipWrapperProps) => {
    if (
      !active ||
      !payload ||
      payload.length === 0 ||
      !coordinate ||
      !chartRef.current
    ) {
      return null;
    }

    const chartRect = chartRef.current.getBoundingClientRect();
    const viewportX = chartRect.left + coordinate.x;
    const viewportY = chartRect.top + coordinate.y;

    return createPortal(
      <div
        css={css`
          position: fixed;
          left: ${viewportX}px;
          top: ${viewportY}px;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 999999;
        `}
      >
        <CustomTooltip
          active={active}
          payload={payload}
          label={String(label)}
          graphData={graphData}
        />
      </div>,
      document.body
    );
  }
);

PortalTooltipWrapper.displayName = 'PortalTooltipWrapper';

export default PortalTooltipWrapper;
