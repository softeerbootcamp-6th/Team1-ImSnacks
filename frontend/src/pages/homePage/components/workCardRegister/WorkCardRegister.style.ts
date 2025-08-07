import { css } from '@emotion/react';
import { Assets, ColorStatus, GrayScale } from '@/styles/colors';
import { BorderRadius } from '@/styles/borderRadius';
import { Spacing } from '@/styles/spacing';
import { Typography } from '@/styles/typography';
import { CROP_NAME } from '@/constants/cropName';

const WorkCardContainer = (
  isDragging: boolean,
  x: number = 0,
  y: number = 0,
  width?: number
) => css`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: ${Spacing.Spacing300};
  padding: ${Spacing.Spacing200} ${Spacing.Spacing300};
  border-radius: ${BorderRadius.Base.S_Hard};
  background-color: ${GrayScale.White};
  border: 1px solid ${GrayScale.G200};
  width: ${width ? `${width}px` : 'auto'};
  transform: translate(${x}px, ${y}px);

  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  opacity: ${isDragging ? 0.8 : 1};
  transition: ${isDragging ? 'none' : 'all 0.2s ease'};
  z-index: ${isDragging ? 1000 : 1};
  user-select: none;
  will-change: transform;

  cursor: grab;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    cursor: grabbing;
  }
`;

const WorkCardContent = css`
  display: flex;
  flex-direction: row;
  gap: ${Spacing.Spacing300};
`;

const WorkCardColorBar = (cropName: string) => css`
  width: 4px;
  height: 42px;
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
  WorkCardContainer,
  WorkCardContent,
  WorkCardColorBar,
  WorkCardInfo,
  WorkCardTitle,
  WorkCardCropName,
  WorkCardTime,
};
