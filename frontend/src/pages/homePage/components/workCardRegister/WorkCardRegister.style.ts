import { css } from '@emotion/react';
import { Assets, ColorStatus, GrayScale } from '@/styles/colors';
import { BorderRadius } from '@/styles/borderRadius';
import { Spacing } from '@/styles/spacing';
import { Typography } from '@/styles/typography';
import { CROP_NAME } from '@/constants/cropName';
import type { CropNameType } from '@/constants/cropName';

interface WorkCardContainerProps {
  isDragging: boolean;
  x: number;
  y: number;
  width?: number;
}

const WorkCardContainer = ({
  isDragging,
  x = 0,
  y = 0,
  width,
}: WorkCardContainerProps) => css`
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
  opacity: ${isDragging ? 0.5 : 1};
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

const WorkCardColorBar = (cropName: CropNameType) => css`
  width: 4px;
  height: 42px;
  background-color: ${ColorStatus.Crops[cropName]};
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
