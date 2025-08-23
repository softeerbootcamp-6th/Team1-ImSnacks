import { css } from '@emotion/react';
import { Opacity } from '@/styles/colors';
import { BorderRadius } from '@/styles/borderRadius';
import { Typography } from '@/styles/typography';
import type { WorkCellType, WorkCellStatus } from '@/types/workCell.type';
import type { Theme } from '@emotion/react';

const borderRadius = {
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

const WorkCellStatusStyle = {
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

const baseStyle = css`
  width: 96px;
  height: 176px;
  transition: background-color 0.1s ease-in-out;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HoverCell = (theme: Theme) => css`
  ${Typography.Caption_S}
  color: ${theme.ColorPrimary.B300};
  text-align: center;
  white-space: pre-line;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const DragIcon = css`
  width: 24px;
  height: 24px;
`;

const workCell = (
  type: WorkCellType,
  status: WorkCellStatus,
  isHovered: boolean
) => css`
  ${baseStyle}
  ${borderRadius[type]}
  ${isHovered ? WorkCellStatusStyle.Hover : WorkCellStatusStyle[status]}

  &:active {
    ${WorkCellStatusStyle.Active}
  }
`;

export default {
  workCell,
  HoverCell,
  DragIcon,
};
