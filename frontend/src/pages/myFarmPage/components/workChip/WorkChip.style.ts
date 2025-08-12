import { css } from '@emotion/react';
import { ColorStatus, GrayScale, Opacity } from '@/styles/colors';
import { BorderRadius } from '@/styles/borderRadius';
import { Spacing } from '@/styles/spacing';
import { FlexStyles } from '@/styles/commonStyles';
import {
  WORK_CHIP_TYPES,
  type WorkChipType,
  type WorkChipStatus,
} from '@/types/workChip.type';

const getWorkChipColorByType = (
  type: WorkChipType,
  status: WorkChipStatus
) => css`
  ${type === WORK_CHIP_TYPES.COMPLETED
    ? completeWorkChipColorByStatus[status]
    : incompleteWorkChipColorByStatus[status]}
`;

const getWorkChipDotColorByType = (
  type: WorkChipType,
  status: WorkChipStatus
) => css`
  ${type === WORK_CHIP_TYPES.COMPLETED
    ? completeWorkChipDotColorByStatus[status]
    : incompleteWorkChipDotColorByStatus[status]}
`;

const WorkChip = (type: WorkChipType) => css`
  ${FlexStyles.flexRow}
  width: fit-content;
  gap: ${Spacing.Spacing100};
  padding: ${Spacing.Spacing100} ${Spacing.Spacing300};
  border-radius: ${BorderRadius.Base.Hard};
  margin-left: auto;
  ${getWorkChipColorByType(type, 'Default')};

  &:hover {
    ${getWorkChipColorByType(type, 'Hover')}
  }

  &:active {
    ${getWorkChipColorByType(type, 'Pressed')}
  }
`;

const WorkChipDot = (type: WorkChipType) => css`
  width: 4px;
  height: 4px;
  border-radius: ${BorderRadius.Base.Hard};
  ${getWorkChipDotColorByType(type, 'Default')};

  button:hover & {
    ${getWorkChipDotColorByType(type, 'Hover')}
  }

  button:active & {
    ${getWorkChipDotColorByType(type, 'Pressed')}
  }
`;

const completeWorkChipDotColorByStatus = {
  Default: css`
    background-color: ${ColorStatus.Global.Green};
  `,
  Pressed: css`
    background-color: ${GrayScale.White};
  `,
  Hover: css`
    background-color: ${ColorStatus.Global.Green};
  `,
};

const incompleteWorkChipDotColorByStatus = {
  Default: css`
    background-color: ${GrayScale.G800};
  `,
  Pressed: css`
    background-color: ${GrayScale.White};
  `,
  Hover: css`
    background-color: ${GrayScale.G800};
  `,
};

const completeWorkChipColorByStatus = {
  Default: css`
    background-color: ${Opacity.Green.Gr200};
    color: ${ColorStatus.Global.Green};
  `,
  Pressed: css`
    background-color: ${ColorStatus.Global.Green};
    color: ${GrayScale.White};
  `,
  Hover: css`
    background-color: ${Opacity.Green.Gr400};
    color: ${ColorStatus.Global.Green};
  `,
};

const incompleteWorkChipColorByStatus = {
  Default: css`
    background-color: ${Opacity.G500['5o200']};
    color: ${GrayScale.G800};
  `,
  Pressed: css`
    background-color: ${GrayScale.G800};
    color: ${GrayScale.White};
  `,
  Hover: css`
    background-color: ${Opacity.G500['5o400']};
    color: ${GrayScale.G800};
  `,
};

export default {
  WorkChip,
  WorkChipDot,
};
