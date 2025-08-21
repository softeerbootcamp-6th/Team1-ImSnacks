export const WORK_TIME_Y_COORDINATE = {
  1: 395,
  2: 450,
  3: 505,
};

export const WORK_TIME_Y_COORDINATE_LIST = [
  WORK_TIME_Y_COORDINATE[1],
  WORK_TIME_Y_COORDINATE[2],
  WORK_TIME_Y_COORDINATE[3],
];

// y좌표 가져오기
export const getYCoordinate = (layer: number) =>
  WORK_TIME_Y_COORDINATE[layer as 1 | 2 | 3] ?? WORK_TIME_Y_COORDINATE[1];

export const X_PX_PER_HOUR = 100;
