import { css } from '@emotion/react';
import { GrayScale } from '@/styles/colors';
import { BorderRadius } from '@/styles/borderRadius';
import { Spacing } from '@/styles/spacing';

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

export default {
  WorkCardContainer,
};
