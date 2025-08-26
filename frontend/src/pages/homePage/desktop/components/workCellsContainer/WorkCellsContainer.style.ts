import { css } from '@emotion/react';
import { WORK_TIME_DEFAULT_X_COORDINATE } from '@/constants/workTimeCoordinate';

const WorkCellsContainerWrapper = (height: number) => css`
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: stretch;
  min-width: max-content;
  height: ${height + 15}px;
  padding: 16px 12px 16px ${WORK_TIME_DEFAULT_X_COORDINATE}px;
  position: relative;
  transition: height 0.1s ease-in-out;
`;

export default { WorkCellsContainerWrapper };
