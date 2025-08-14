const WORK_TIME_Y_COORDINATE = {
  1: 35,
  2: 90,
  3: 145,
};

// y좌표 가져오기
export const getYCoordinate = (layer: number) =>
  WORK_TIME_Y_COORDINATE[layer as 1 | 2 | 3] ?? WORK_TIME_Y_COORDINATE[1];

export { WORK_TIME_Y_COORDINATE };
