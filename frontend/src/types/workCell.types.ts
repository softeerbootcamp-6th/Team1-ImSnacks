export const WORK_CELL_TYPES = {
  START: 'Start',
  MIDDLE: 'Middle',
  END: 'End',
} as const;

export const WORK_CELL_STATUSES = {
  DEFAULT: 'Default',
  HOVER: 'Hover',
  ACTIVE: 'Active',
} as const;

export type WorkCellType =
  (typeof WORK_CELL_TYPES)[keyof typeof WORK_CELL_TYPES];
export type WorkCellStatus =
  (typeof WORK_CELL_STATUSES)[keyof typeof WORK_CELL_STATUSES];
