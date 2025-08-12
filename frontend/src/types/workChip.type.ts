export const WORK_CHIP_TYPES = {
  COMPLETED: 'COMPLETED',
  INCOMPLETED: 'INCOMPLETED',
} as const;

export const WORK_CHIP_STATUSES = {
  DEFAULT: 'Default',
  HOVER: 'Hover',
  PRESSED: 'Pressed',
} as const;

export type WorkChipType =
  (typeof WORK_CHIP_TYPES)[keyof typeof WORK_CHIP_TYPES];
export type WorkChipStatus =
  (typeof WORK_CHIP_STATUSES)[keyof typeof WORK_CHIP_STATUSES];
