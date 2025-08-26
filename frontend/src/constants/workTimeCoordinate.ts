export const WORK_BLOCK_Y_COORDINATE_GAP = 55;
export const BASE_TIME_Y_COORDINATE = 395;
export const WORK_BLOCK_HEIGHT = 52;

export const X_PX_PER_HOUR = 100;

export const WORK_TIME_DEFAULT_X_COORDINATE = 16;

export const getYCoordinate = (layer: number) =>
  BASE_TIME_Y_COORDINATE + (layer - 1) * WORK_BLOCK_Y_COORDINATE_GAP;
