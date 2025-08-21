import { css } from '@emotion/react';
import { WORK_TIME_DEFAULT_X_COORDINATE } from '@/constants/workTimePx';

const WorkCellsContainerWrapper = css`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  min-width: max-content;
  padding: 16px ${WORK_TIME_DEFAULT_X_COORDINATE}px 16px 12px;
  position: relative;
`;

export default { WorkCellsContainerWrapper };
