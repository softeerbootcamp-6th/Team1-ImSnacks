import { css } from '@emotion/react';
import { Assets, ColorStatus } from '@/styles/colors';
import { BorderRadius } from '@/styles/borderRadius';
import { Spacing } from '@/styles/spacing';
import { Typography } from '@/styles/typography';
import { CROP_NAME } from '@/constants/cropName';
import type { CropNameType } from '@/types/crop.type';

const WorkCardContent = css`
  display: flex;
  flex-direction: row;
  gap: ${Spacing.Spacing300};
`;

const WorkCardColorBar = (cropName: CropNameType) => css`
  width: 4px;
  height: 42px;
  background-color: ${ColorStatus.Crops[CROP_NAME[cropName]]};
  border-radius: ${BorderRadius.Base.Hard};
`;

const WorkCardInfo = css`
  display: flex;
  flex-direction: column;
  gap: ${Spacing.Spacing100};
`;

const WorkCardTitle = css`
  ${Typography.Body_S_400}
  color: ${Assets.Text.WorkCard.Default.Headline};
`;

const WorkCardCropName = css`
  ${Typography.Caption_S}
  color: ${Assets.Text.WorkCard.Default.Headline};
`;

const WorkCardTime = css`
  ${Typography.Caption_S}
  color: ${Assets.Text.WorkCard.Default.Body};
`;

export default {
  WorkCardContent,
  WorkCardColorBar,
  WorkCardInfo,
  WorkCardTitle,
  WorkCardCropName,
  WorkCardTime,
};
