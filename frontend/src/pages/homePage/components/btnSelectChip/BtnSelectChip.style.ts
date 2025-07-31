import { css } from '@emotion/react';
import { Assets } from '@/styles/colors';
import { Spacing } from '@/styles/spacing';
import { Typography } from '@/styles/typography';
import { BorderRadius } from '@/styles/borderRadius';

const sizeSmallStyle = css`
  height: 28px;
`;

const sizeLargeStyle = css`
  height: 36px;
`;

const statusStyle = {
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

const baseStyle = css`
  ${Typography.Body_S}
  border-radius: ${BorderRadius.Base.Soft};
  padding: ${Spacing.Spacing100} ${Spacing.Spacing400};
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  transition: all 0.1s ease-in-out;
  cursor: pointer;
`;

export const BtnSelectChipStyle = (
  size: 'Small' | 'Large',
  status: 'Default' | 'Pressed' | 'Hover' | 'Disabled'
) => css`
  ${baseStyle}
  ${size === 'Small' ? sizeSmallStyle : sizeLargeStyle}
  ${statusStyle[status]}
  
  &:hover {
    ${statusStyle.Hover}
  }

  &:active {
    ${statusStyle.Pressed}
  }

  &:focus {
    ${statusStyle.Pressed}
  }

  &:disabled {
    ${statusStyle.Disabled}
  }
`;

export default {
  BtnSelectChipStyle,
};
