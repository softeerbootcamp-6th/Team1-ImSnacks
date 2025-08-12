import { GrayScale } from '@/styles/colors';
import { FlexStyles } from '@/styles/commonStyles';
import { Spacing } from '@/styles/spacing';
import { WORK_CHIP_TYPES, type WorkChipType } from '@/types/workChip.type';
import { css } from '@emotion/react';

const MobileWorkCard = (status: WorkChipType) => css`
  ${FlexStyles.flexRow};
  justify-content: space-between;
  gap: ${Spacing.Spacing300};
  align-self: stretch;
  background: ${GrayScale.White};
  border-radius: 8px;
  padding: ${Spacing.Spacing300};
  border: 1px solid ${GrayScale.G100};

  opacity: ${status === WORK_CHIP_TYPES.COMPLETED ? 0.4 : 1};
`;

export default {
  MobileWorkCard,
};
