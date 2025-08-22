import { css } from '@emotion/react';
import { ColorStatus, GrayScale } from '@/styles/colors';
import { BorderRadius } from '@/styles/borderRadius';
import { Spacing } from '@/styles/spacing';
import { Typography } from '@/styles/typography';
import type { Size } from '@/types/size.type';
import { FlexStyles } from '@/styles/commonStyles';
import { Assets } from '@/styles/colors';

const WorkCardToolTip = css`
  ${FlexStyles.flexColumn};
  gap: ${Spacing.Spacing100};
  padding: 0 ${Spacing.Spacing200};
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const WorkCardToolTipContent = css`
  ${FlexStyles.flexRow};
  gap: ${Spacing.Spacing300};
`;

const WorkCardToolTipTitle = css`
  ${Typography.Body_S_400}
  color: ${Assets.Text.WorkCard.Default.Headline};
`;

const WorkCardToolTipCropName = css`
  ${Typography.Caption_S}
  color: ${Assets.Text.WorkCard.Default.Headline};
`;

const WorkCardToolTipTime = css`
  ${Typography.Caption_S}
  color: ${Assets.Text.WorkCard.Default.Body};
`;

const WorkCardContainer = (size: Size) => css`
  position: absolute;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  gap: ${Spacing.Spacing300};
  padding: ${Spacing.Spacing200} ${Spacing.Spacing300};
  border-radius: ${BorderRadius.Base.S_Hard};
  background-color: ${GrayScale.White};
  border: 1px solid ${GrayScale.G200};
  width: ${size.width ? `${size.width}px` : 'auto'};
  height: ${size.height ? `${size.height}px` : 'auto'};

  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  user-select: none;
  overflow: visible;

  cursor: grab;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    cursor: grabbing;
  }
`;

const WorkCardDeleteButton = css`
  position: absolute;
  top: 50%;
  right: ${Spacing.Spacing200};
  transform: translateY(-50%);
  color: ${ColorStatus.Global.Red};
  ${Typography.Caption_S}
  font-weight: 700;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${GrayScale.G200};
  }
`;

const WorkCardResizeHandle = css`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 8px;
  background-color: transparent;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${GrayScale.G300};
  }

  &:active {
    background-color: ${GrayScale.G400};
  }

  touch-action: none;
  user-select: none;
  -webkit-user-drag: none;
  cursor: ew-resize;
`;

const WorkCardResizeHandleLeft = css`
  ${WorkCardResizeHandle}
  left: 0;
  border-radius: ${BorderRadius.Base.S_Hard} 0 0 ${BorderRadius.Base.S_Hard};
`;

const WorkCardResizeHandleRight = css`
  ${WorkCardResizeHandle}
  right: 0;
  border-radius: 0 ${BorderRadius.Base.S_Hard} ${BorderRadius.Base.S_Hard} 0;
`;

export default {
  WorkCardContainer,
  WorkCardToolTip,
  WorkCardToolTipContent,
  WorkCardToolTipTitle,
  WorkCardToolTipCropName,
  WorkCardToolTipTime,
  WorkCardDeleteButton,
  WorkCardResizeHandleLeft,
  WorkCardResizeHandleRight,
};
