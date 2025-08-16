import { css } from '@emotion/react';
import WorkCell from '../workCell/WorkCell';
import { WORK_CELL_TYPES, WORK_CELL_STATUSES } from '@/types/workCell.type';

const WorkCellsContainer = () => {
  return (
    <>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        `}
      >
        <WorkCell
          type={WORK_CELL_TYPES.START}
          status={WORK_CELL_STATUSES.DEFAULT}
        />
      </div>
      {Array.from({ length: 22 }, (_, index) => {
        return (
          <div
            key={index}
            css={css`
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 4px;
            `}
          >
            <WorkCell
              type={WORK_CELL_TYPES.MIDDLE}
              status={WORK_CELL_STATUSES.DEFAULT}
            />
          </div>
        );
      })}
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        `}
      >
        <WorkCell
          type={WORK_CELL_TYPES.END}
          status={WORK_CELL_STATUSES.DEFAULT}
        />
      </div>
    </>
  );
};

export default WorkCellsContainer;
