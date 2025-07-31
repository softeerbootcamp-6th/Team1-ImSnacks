import { css } from '@emotion/react';
import { Assets } from '@/styles/colors';
import { Spacing } from '@/styles/spacing';
import { Typography } from '@/styles/typography';
import { BorderRadius } from '@/styles/borderRadius';
import type {
  BtnSelectChipSizeType,
  BtnSelectChipStatusType,
} from '@/types/btnSelectChip.types';

const BtnSelectChipSizeStyle = {
  Small: css`
    height: 28px;
  `,
  Large: css`
    height: 36px;
  `,
};

const BtnSelectChipStatusStyle = {
  Default: css`
    background-color: ${Assets.Global.Button.Default};
    color: ${Assets.Text.Button.SelectChip.Default};
  `,
  Pressed: css`
    background-color: ${Assets.Global.Button.Pressed};
    color: ${Assets.Text.Button.SelectChip.Pressed};
  `,
  Hover: css`
    background-color: ${Assets.Global.Button.Hover};
    color: ${Assets.Text.Button.SelectChip.Hover};
  `,
  Disabled: css`
    background-color: ${Assets.Global.Button.Disabled};
    color: ${Assets.Text.Button.SelectChip.Disabled};
  `,
};

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
  size: BtnSelectChipSizeType,
  status: BtnSelectChipStatusType
) => css`
  ${BtnSelectChipBase}
  ${BtnSelectChipSizeStyle[size]}
  ${BtnSelectChipStatusStyle[status]}
  
  &:hover {
    ${BtnSelectChipStatusStyle.Hover}
  }

  &:active {
    ${BtnSelectChipStatusStyle.Pressed}
  }

  &:focus {
    ${BtnSelectChipStatusStyle.Pressed}
  }

  &:disabled {
    ${BtnSelectChipStatusStyle.Disabled}
  }
`;

export default {
  BtnSelectChip,
};
