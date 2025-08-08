import { css } from '@emotion/react';
import { Assets, ColorStatus, GrayScale } from '@/styles/colors';
import { BorderRadius } from '@/styles/borderRadius';
import { Spacing } from '@/styles/spacing';
import { Typography } from '@/styles/typography';
import { CROP_NAME } from '@/constants/cropName';

const WorkCardContainer = css`
  display: flex;
  flex-direction: column;
  gap: ${Spacing.Spacing300};
  padding: ${Spacing.Spacing200} ${Spacing.Spacing300};
  border-radius: ${BorderRadius.Base.S_Hard};
  background-color: ${GrayScale.White};
  border: 1px solid ${GrayScale.G200};
`;

const WorkCardContent = css`
  display: flex;
  flex-direction: row;
  gap: ${Spacing.Spacing300};
`;

const WorkCardColorBar = (cropName: string) => css`
  width: 4px;
  height: 76px;
  background-color: ${ColorStatus.Crops[
    CROP_NAME[
      cropName as keyof typeof CROP_NAME
    ] as keyof typeof ColorStatus.Crops
  ]};
  border-radius: ${BorderRadius.Base.Hard};
`;

const WorkCardInfo = css`
  display: flex;
  flex-direction: column;
  gap: ${Spacing.Spacing100};
`;

const WorkCardTitle = css`
  ${Typography.Body_L_500}
  color: ${Assets.Text.WorkCard.Default.Headline};
`;

const WorkCardCropName = css`
  ${Typography.Body_S_400}
  color: ${Assets.Text.WorkCard.Default.Headline};
`;

const WorkCardTime = css`
  ${Typography.Caption_S}
  color: ${Assets.Text.WorkCard.Default.Body};
`;

export default {
  WorkCardContainer,
  WorkCardContent,
  WorkCardColorBar,
  WorkCardInfo,
  WorkCardTitle,
  WorkCardCropName,
  WorkCardTime,
};
