import { css } from '@emotion/react';
import { Opacity } from '@/styles/colors';
import { BorderRadius } from '@/styles/borderRadius';
import type { WorkCellType, WorkCellStatus } from '@/types/workCell.type';

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
  min-height: 176px;
  align-self: stretch;
  transition: background-color 0.1s ease-in-out;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DragIcon = css`
  width: 24px;
  height: 24px;
`;

const workCell = (type: WorkCellType, status: WorkCellStatus) => css`
  ${baseStyle}
  ${borderRadius[type]}
  ${WorkCellStatusStyle[status]}

  &:active {
    ${WorkCellStatusStyle.Active}
  }
`;

export default {
  workCell,
  DragIcon,
};
