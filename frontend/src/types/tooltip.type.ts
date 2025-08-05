export const TOOLTIP_DIRECTIONS = {
  TOP: 'Top',
  BOTTOM: 'Bottom',
  LEFT: 'Left',
  RIGHT: 'Right',
} as const;

export const TOOLTIP_TYPES = {
  DEFAULT: 'Default',
  WORKING: 'Working',
  NEIGHBOR: 'Neighbor',
} as const;

export type TooltipDirectionType =
  (typeof TOOLTIP_DIRECTIONS)[keyof typeof TOOLTIP_DIRECTIONS];

export type TooltipType = (typeof TOOLTIP_TYPES)[keyof typeof TOOLTIP_TYPES];
