import { css } from '@emotion/react';
import { GrayScale } from '@/styles/colors';
import { Spacing } from '@/styles/spacing';
import { Typography } from '@/styles/typography';
import { BorderRadius } from '@/styles/borderRadius';
import type {
  BtnSelectChipSize,
  BtnSelectChipStatus,
} from '@/types/btnSelectChip.type';
import type { Theme } from '@emotion/react';

const BtnSelectChipSizeStyle = {
  Small: css`
    height: 28px;
  `,
  Large: css`
    height: 36px;
  `,
};

const BtnSelectChipStatusStyle = (theme: Theme) => ({
  Default: css`
    background-color: ${theme.Assets.Global.Button.Default};
    color: ${theme.Assets.Text.Button.SelectChip.Default};
  `,
  Pressed: css`
    background-color: ${theme.Assets.Global.Button.Pressed};
    color: ${theme.Assets.Text.Button.SelectChip.Pressed};
  `,
  Hover: css`
    background-color: ${theme.Assets.Global.Button.Hover};
    color: ${theme.Assets.Text.Button.SelectChip.Hover};
  `,
  Disabled: css`
    background-color: ${GrayScale.White};
    color: ${theme.Assets.Text.Button.SelectChip.Disabled};
    cursor: default;
  `,
});

const BtnSelectChipBase = css`
  ${Typography.Body_S_400}
  border-radius: ${BorderRadius.Base.Soft};
  padding: ${Spacing.Spacing100} ${Spacing.Spacing400};
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  transition: all 0.1s ease-in-out;
  cursor: pointer;
`;

export const BtnSelectChip = (
  size: BtnSelectChipSize,
  status: BtnSelectChipStatus,
  theme: Theme
) => css`
  ${BtnSelectChipBase}
  ${BtnSelectChipSizeStyle[size]}
  ${BtnSelectChipStatusStyle(theme)[status]}
  
  &:hover {
    ${BtnSelectChipStatusStyle(theme).Hover}
  }

  &:active {
    ${BtnSelectChipStatusStyle(theme).Pressed}
  }

  &:focus {
    ${BtnSelectChipStatusStyle(theme).Pressed}
  }

  &:disabled {
    ${BtnSelectChipStatusStyle(theme).Disabled}
  }
`;

export default {
  BtnSelectChip,
};
