import { css } from '@emotion/react';
import { Assets } from '@/styles/colors';
import { Spacing } from '@/styles/spacing';
import { Typography } from '@/styles/typography';
import { BorderRadius } from '@/styles/borderRadius';

const sizeStyles = {
  Small: { height: '28px' },
  Large: { height: '36px' },
};

const statusStyles = {
  Default: {
    backgroundColor: Assets.Global.Button.Default,
    color: Assets.Text.Button.SelectChip.Default,
  },
  Hover: {
    backgroundColor: Assets.Global.Button.Hover,
    color: Assets.Text.Button.SelectChip.Hover,
  },
  Pressed: {
    backgroundColor: Assets.Global.Button.Pressed,
    color: Assets.Text.Button.SelectChip.Pressed,
  },
  Disabled: {
    backgroundColor: Assets.Global.Button.Disabled,
    color: Assets.Text.Button.SelectChip.Disabled,
    cursor: 'not-allowed',
  },
};

const BtnSelectChipStyle = (
  size: 'Small' | 'Large',
  status?: 'Default' | 'Hover' | 'Pressed' | 'Disabled'
) => css`
  ${Typography.Body_S}
  border-radius: ${BorderRadius.Base.Soft};
  padding: ${Spacing.Spacing100} ${Spacing.Spacing400};
  display: flex;
  align-items: center;
  justify-content: center;
  ${sizeStyles[size]}
  border: none;
  transition: all 0.1s ease-in-out;
  cursor: pointer;

  ${(status && statusStyles[status]) || statusStyles.Default}

  &:hover {
    ${statusStyles.Hover}
  }

  &:active {
    ${statusStyles.Pressed}
  }

  &:disabled {
    ${statusStyles.Disabled}
  }
`;

export default { BtnSelectChipStyle };
