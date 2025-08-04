export const TOOLTIP_DIRECTIONS = {
  TOP: 'Top',
  BOTTOM: 'Bottom',
  LEFT: 'Left',
  RIGHT: 'Right',
} as const;

export type TooltipDirectionType =
  (typeof TOOLTIP_DIRECTIONS)[keyof typeof TOOLTIP_DIRECTIONS];
