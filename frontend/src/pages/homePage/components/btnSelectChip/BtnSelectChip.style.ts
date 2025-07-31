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

const defaultStyle = css`
  background-color: ${Assets.Global.Button.Default};
  color: ${Assets.Text.Button.SelectChip.Default};
`;

const hoverStyle = css`
  background-color: ${Assets.Global.Button.Hover};
  color: ${Assets.Text.Button.SelectChip.Hover};
`;

const pressedStyle = css`
  background-color: ${Assets.Global.Button.Pressed};
  color: ${Assets.Text.Button.SelectChip.Pressed};
`;

const disabledStyle = css`
  background-color: ${Assets.Global.Button.Disabled};
  color: ${Assets.Text.Button.SelectChip.Disabled};
  cursor: not-allowed;
`;

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

export const BtnSelectChipStyle = (size: 'Small' | 'Large') => css`
  ${baseStyle}
  ${size === 'Small' ? sizeSmallStyle : sizeLargeStyle}
  ${defaultStyle}

  &:hover {
    ${hoverStyle}
  }

  &:active {
    ${pressedStyle}
  }

  &:disabled {
    ${disabledStyle}
  }
`;

export default {
  BtnSelectChipStyle,
};
