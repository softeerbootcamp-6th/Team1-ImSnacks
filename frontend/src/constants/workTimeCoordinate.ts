const WORK_TIME_Y_COORDINATE = {
  1: 20,
  2: 75,
  3: 130,
};

// y좌표 가져오기
export const getYCoordinate = (layer: number) =>
  WORK_TIME_Y_COORDINATE[layer as 1 | 2 | 3] ?? WORK_TIME_Y_COORDINATE[1];

export { WORK_TIME_Y_COORDINATE };
