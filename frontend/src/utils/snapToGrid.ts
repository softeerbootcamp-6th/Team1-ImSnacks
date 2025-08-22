import { X_PX_PER_HOUR } from '@/constants/workTimeCoordinate';

const PX_PER_TEN_MINUTE = X_PX_PER_HOUR / 6;

export const snapToGrid = (
  value: number,
  gridSize: number = PX_PER_TEN_MINUTE
): number => {
  return Math.round(value / gridSize) * gridSize;
};

export const snapPositionToGrid = (
  position: { x: number; y: number },
  gridSize: number = PX_PER_TEN_MINUTE
): { x: number; y: number } => {
  return {
    x: snapToGrid(position.x, gridSize),
    y: snapToGrid(position.y, gridSize),
  };
};

export const snapWidthToGrid = (
  width: number,
  gridSize: number = PX_PER_TEN_MINUTE
): number => {
  return Math.max(gridSize, snapToGrid(width, gridSize));
};
