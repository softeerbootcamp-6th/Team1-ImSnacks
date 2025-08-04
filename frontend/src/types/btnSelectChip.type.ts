export const BTN_SELECT_CHIP_SIZES = {
  SMALL: 'Small',
  LARGE: 'Large',
} as const;
export const BTN_SELECT_CHIP_STATUSES = {
  DEFAULT: 'Default',
  PRESSED: 'Pressed',
  HOVER: 'Hover',
  DISABLED: 'Disabled',
} as const;

export type BtnSelectChipSize =
  (typeof BTN_SELECT_CHIP_SIZES)[keyof typeof BTN_SELECT_CHIP_SIZES];
export type BtnSelectChipStatus =
  (typeof BTN_SELECT_CHIP_STATUSES)[keyof typeof BTN_SELECT_CHIP_STATUSES];
