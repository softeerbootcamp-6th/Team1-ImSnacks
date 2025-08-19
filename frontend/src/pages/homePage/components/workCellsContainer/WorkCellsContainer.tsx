import WorkCell from '../workCell/WorkCell';
import { WORK_CELL_TYPES, WORK_CELL_STATUSES } from '@/types/workCell.type';
import WorkActiveToolTip from '../workActiveToolTip/WorkActiveToolTip';
import S from './WorkCellsContainer.style';
import { memo } from 'react';
import type { RecommendedWorksResponse } from '@/types/openapiGenerator';

const WorkCellsContainer = memo(
  ({
    selectedRecommendedWork,
  }: {
    selectedRecommendedWork: RecommendedWorksResponse | null;
  }) => {
    return (
      <>
        <div css={S.WorkCellsContainerWrapper}>
          <WorkActiveToolTip
            selectedRecommendedWork={selectedRecommendedWork}
          />
          <WorkCell
            type={WORK_CELL_TYPES.START}
            status={WORK_CELL_STATUSES.DEFAULT}
          />
          {Array.from({ length: 21 }, (_, index) => {
            return (
              <WorkCell
                key={index}
                type={WORK_CELL_TYPES.MIDDLE}
                status={WORK_CELL_STATUSES.DEFAULT}
              />
            );
          })}
          <WorkCell
            type={WORK_CELL_TYPES.END}
            status={WORK_CELL_STATUSES.DEFAULT}
          />
        </div>
      </>
    );
  }
);

export default WorkCellsContainer;
