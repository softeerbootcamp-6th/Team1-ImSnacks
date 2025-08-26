import WorkCell from '../workCell/WorkCell';
import { WORK_CELL_TYPES, WORK_CELL_STATUSES } from '@/types/workCell.type';
import WorkActiveToolTip from '../workActiveToolTip/WorkActiveToolTip';
import S from './WorkCellsContainer.style';
import { memo, useMemo } from 'react';
import type { RecommendedWorksResponse } from '@/types/openapiGenerator';
import type { WorkBlockType } from '@/types/workCard.type';
import {
  BASE_TIME_Y_COORDINATE,
  getYCoordinate,
} from '@/constants/workTimeCoordinate';
import useMaxLayerStore from '@/store/useMaxLayerStore';

const WorkCellsContainer = memo(
  ({
    selectedRecommendedWork,
    workBlocks,
  }: {
    selectedRecommendedWork: RecommendedWorksResponse | null;
    workBlocks: WorkBlockType[];
  }) => {
    const { maxLayer } = useMaxLayerStore();

    // 동적 높이 설정
    const workCellsContainerHeight = useMemo(() => {
      if (workBlocks.length === 0) return 176; // 기본 높이

      const maxY = getYCoordinate(maxLayer + 1) - BASE_TIME_Y_COORDINATE;

      // 최소 높이 176px 보장
      return Math.max(maxY, 176);
    }, [workBlocks, maxLayer]);

    return (
      <>
        <div css={S.WorkCellsContainerWrapper(workCellsContainerHeight)}>
          <WorkActiveToolTip
            selectedRecommendedWork={selectedRecommendedWork}
            workCellsContainerHeight={workCellsContainerHeight}
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
