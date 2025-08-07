import { css } from '@emotion/react';
import WorkCell from '../workCell/WorkCell';
import { WORK_CELL_TYPES, WORK_CELL_STATUSES } from '@/types/workCell.type';

interface WorkCellsProps {
  isDragging: boolean;
}

const WorkCells = ({ isDragging }: WorkCellsProps) => {
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
        <div
          css={css`
            font-size: 10px;
            color: #666;
            font-weight: 500;
            align-self: flex-start;
          `}
        >
          00
        </div>
        <WorkCell
          type={WORK_CELL_TYPES.START}
          status={WORK_CELL_STATUSES.DEFAULT}
          isDragging={isDragging}
        />
      </div>
      {Array.from({ length: 22 }, (_, index) => {
        const hour = index + 1;
        const timeLabel = `${hour.toString().padStart(2, '0')}`;
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
            <div
              css={css`
                font-size: 10px;
                color: #666;
                font-weight: 500;
                align-self: flex-start;
              `}
            >
              {timeLabel}
            </div>
            <WorkCell
              type={WORK_CELL_TYPES.MIDDLE}
              status={WORK_CELL_STATUSES.DEFAULT}
              isDragging={isDragging}
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
        <div
          css={css`
            font-size: 10px;
            color: #666;
            font-weight: 500;
            align-self: flex-start;
          `}
        >
          23
        </div>
        <WorkCell
          type={WORK_CELL_TYPES.END}
          status={WORK_CELL_STATUSES.DEFAULT}
          isDragging={isDragging}
        />
      </div>
    </>
  );
};

export default WorkCells;
