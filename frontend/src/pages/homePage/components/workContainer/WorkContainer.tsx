import { css } from '@emotion/react';
import WorkCell from '../workCell/WorkCell';
import { WORK_CELL_STATUSES, WORK_CELL_TYPES } from '@/types/workCell.types';

const WorkContainer = () => {
  const workCells = [
    <WorkCell
      type={WORK_CELL_TYPES.START}
      status={WORK_CELL_STATUSES.DEFAULT}
    />,
    ...Array.from({ length: 12 }, (_, index) => {
      return (
        <WorkCell
          key={index}
          type={WORK_CELL_TYPES.MIDDLE}
          status={WORK_CELL_STATUSES.DEFAULT}
        />
      );
    }),
    <WorkCell type={WORK_CELL_TYPES.END} status={WORK_CELL_STATUSES.DEFAULT} />,
  ];

  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        gap: 8px;
        align-items: center;
      `}
    >
      {workCells}
    </div>
  );
};

export default WorkContainer;
