import { BorderRadius } from '@/styles/borderRadius';
import { Assets, ColorPrimary, GrayScale } from '@/styles/colors';
import { Spacing } from '@/styles/spacing';
import { Typography } from '@/styles/typography';
import { css } from '@emotion/react';
import type { TooltipDirectionType, TooltipType } from '@/types/tooltip.type';

export const tooltipPosition = {
  Top: (offset = 60) => css`
    top: -${offset}px;
    left: 50%;
    transform: translateX(-50%);
  `,
  Bottom: (offset = 50) => css`
    bottom: -${offset}px;
    left: 50%;
    transform: translateX(-50%);
  `,
  Left: (offset = 40) => css`
    top: 50%;
    right: ${offset}px;
    transform: translateY(-50%);
  `,
  Right: (offset = 40) => css`
    top: 50%;
    left: ${offset}px;
    transform: translateY(-50%);
  `,
};

export const tooltipArrowPosition = {
  Top: (offset = -10) => css`
    bottom: ${offset}px;
    left: 50%;
    transform: translateX(-50%);
  `,
  Bottom: (offset = -10) => css`
    top: -${offset}px;
    left: 50%;
    transform: translateX(-50%) rotate(180deg);
  `,
  Left: (offset = -10) => css`
    top: 50%;
    right: ${offset}px;
    transform: translateY(-50%) rotate(-90deg);
  `,
  Right: (offset = -10) => css`
    top: 50%;
    left: ${offset}px;
    transform: translateY(-50%) rotate(90deg);
  `,
};

const tooltipColorByType = {
  Default: css`
    background-color: ${GrayScale.White};
    color: ${Assets.Text.ToolTip.Default};
  `,
  Working: css`
    background-color: ${GrayScale.White};
    color: ${Assets.Text.ToolTip.Neighbor};
  `,
  Neighbor: css`
    background-color: ${ColorPrimary.B300};
    color: ${Assets.Text.ToolTip.Neighbor};
  `,
};

const TooltipArrowColorByType = {
  Default: css`
    color: ${GrayScale.White};
  `,
  Working: css`
    color: ${GrayScale.White};
  `,
  Neighbor: css`
    color: ${ColorPrimary.B300};
  `,
};

const ToolTip = (direction: TooltipDirectionType, type: TooltipType) => css`
  position: absolute;
  ${tooltipPosition[direction]()}
  ${tooltipColorByType[type]};
  ${Typography.Caption_S}
  z-index: 10;

  min-height: 36px;
  white-space: pre;
  padding: ${Spacing.Spacing300};
  border-radius: ${BorderRadius.Base.S_Hard};
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  text-align: center;
  justify-content: center;
`;

const TooltipArrow = (direction: TooltipDirectionType, type: TooltipType) =>
  css`
    position: absolute;
    ${tooltipArrowPosition[direction]()}
    ${TooltipArrowColorByType[type]}
  `;

export default { ToolTip, TooltipArrow };
