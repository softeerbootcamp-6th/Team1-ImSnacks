import { BorderRadius } from '@/styles/borderRadius';
import { Assets, GrayScale } from '@/styles/colors';
import { Spacing } from '@/styles/spacing';
import { Typography } from '@/styles/typography';
import { css } from '@emotion/react';
import type { TooltipDirectionType } from '@/types/tooltip.type';

const tooltipPosition = {
  Top: css`
    top: -60px;
    left: 50%;
    transform: translateX(-50%);
  `,
  Bottom: css`
    bottom: -50px;
    left: 50%;
    transform: translateX(-50%);
  `,
  Left: css`
    top: 50%;
    right: 40px;
    transform: translateY(-50%);
  `,
  Right: css`
    top: 50%;
    left: 40px;
    transform: translateY(-50%);
  `,
};

const tooltipArrowPosition = {
  Top: css`
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
  `,
  Bottom: css`
    top: -10px;
    left: 50%;
    transform: translateX(-50%) rotate(180deg);
  `,
  Left: css`
    top: 50%;
    right: -10px;
    transform: translateY(-50%) rotate(-90deg);
  `,
  Right: css`
    top: 50%;
    left: -10px;
    transform: translateY(-50%) rotate(90deg);
  `,
};

const ToolTip = (direction: TooltipDirectionType) => css`
  position: absolute;
  ${tooltipPosition[direction]}
  color: ${Assets.Text.ToolTip.Default};
  ${Typography.Caption_S}
  z-index: 10;

  min-height: 36px;
  white-space: pre;
  padding: ${Spacing.Spacing300};
  background-color: ${GrayScale.White};
  border-radius: ${BorderRadius.Base.S_Hard};
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  text-align: center;
  justify-content: center;
`;

const TooltipArrowPosition = (direction: TooltipDirectionType) =>
  css`
    position: absolute;
    ${tooltipArrowPosition[direction]}
  `;

export default { ToolTip, TooltipArrowPosition };
