import { css } from '@emotion/react';
import { ColorStatus, GrayScale } from '@/styles/colors';
import { BorderRadius } from '@/styles/borderRadius';
import { Spacing } from '@/styles/spacing';
import { Typography } from '@/styles/typography';
import type { Size } from '@/types/workCard.type';

interface WorkCardContainerProps {
  isDragging: boolean;
  size: Size;
}

const WorkCardContainer = ({ isDragging, size }: WorkCardContainerProps) => css`
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
  z-index: ${isDragging ? 1000 : 1};
  user-select: none;

  cursor: grab;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    cursor: grabbing;
  }
`;

const WorkCardDeleteButton = css`
  color: ${ColorStatus.Global.Red};
  ${Typography.Caption_S}
  font-weight: 700;
`;

const WorkCardResizeHandle = css`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 8px;
  cursor: ew-resize;
  background-color: transparent;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${GrayScale.G300};
  }

  &:active {
    background-color: ${GrayScale.G400};
  }
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
  WorkCardDeleteButton,
  WorkCardResizeHandleLeft,
  WorkCardResizeHandleRight,
};
