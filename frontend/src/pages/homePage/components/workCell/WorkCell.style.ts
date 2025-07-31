import { css } from '@emotion/react';
import { ColorPrimary, Opacity } from '@/styles/colors';
import { BorderRadius } from '@/styles/borderRadius';
import { Typography } from '@/styles/typography';

export const borderRadiusStyles = {
  Start: css`
    border-radius: ${BorderRadius.Base.Soft} 0 0 ${BorderRadius.Base.Soft};
  `,
  Middle: css`
    border-radius: 0;
  `,
  End: css`
    border-radius: 0 ${BorderRadius.Base.Soft} ${BorderRadius.Base.Soft} 0;
  `,
};

export const statusStyles = {
  Default: css`
    background-color: ${Opacity.White.W200};
  `,
  Hover: css`
    background-color: ${Opacity.White.W800};
  `,
  Active: css`
    background-color: ${Opacity.White.W800};
  `,
};

export const baseStyle = css`
  width: 92px;
  height: 176px;
  transition: background-color 0.1s ease-in-out;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const HoverCell = css`
  ${Typography.Caption_S}
  color: ${ColorPrimary.B300};
  text-align: center;
  white-space: pre-line;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

export const DragIcon = css`
  width: 24px;
  height: 24px;
`;

export const workCell = (
  type: 'Start' | 'Middle' | 'End',
  status: 'Default' | 'Hover' | 'Active',
  isHovered: boolean
) => css`
  ${baseStyle}
  ${borderRadiusStyles[type]}
  ${isHovered ? statusStyles.Hover : statusStyles[status]}

  &:active {
    ${statusStyles.Active}
  }
`;

export default {
  workCell,
  HoverCell,
  DragIcon,
};
