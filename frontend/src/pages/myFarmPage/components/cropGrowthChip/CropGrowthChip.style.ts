import { css } from '@emotion/react';
import { BorderRadius } from '@/styles/borderRadius';
import { Spacing } from '@/styles/spacing';
import { ColorStatus } from '@/styles/colors';

const CropGrowthChip = css`
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${BorderRadius.Base.S_Hard};
  padding: ${Spacing.Spacing100} ${Spacing.Spacing300};
`;

const CropGrowthChipColorByStep = (step: number) => css`
  background-color: ${ColorStatus.Growth[
    `Grb${step}00` as keyof typeof ColorStatus.Growth
  ]};
  color: ${ColorStatus.Growth[
    `Grt${step}00` as keyof typeof ColorStatus.Growth
  ]};
`;

export default {
  CropGrowthChip,
  CropGrowthChipColorByStep,
};
