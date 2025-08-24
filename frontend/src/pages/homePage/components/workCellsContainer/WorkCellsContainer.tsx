import WorkCell from '../workCell/WorkCell';
import { WORK_CELL_TYPES, WORK_CELL_STATUSES } from '@/types/workCell.type';
import WorkActiveToolTip from '../workActiveToolTip/WorkActiveToolTip';
import S from './WorkCellsContainer.style';
import { memo, useMemo } from 'react';
import type { RecommendedWorksResponse } from '@/types/openapiGenerator';
import type { WorkBlockType } from '@/types/workCard.type';
import {
  BASE_TIME_Y_COORDINATE,
  WORK_BLOCK_HEIGHT,
  getGlobalMaxLayer,
} from '@/constants/workTimeCoordinate';

const WorkCellsContainer = memo(
  ({
    selectedRecommendedWork,
    workBlocks,
  }: {
    selectedRecommendedWork: RecommendedWorksResponse | null;
    workBlocks: WorkBlockType[];
  }) => {
    // 전역 변수에서 최대 레이어를 가져와서 동적 높이 설정
    const dynamicHeight = useMemo(() => {
      if (workBlocks.length === 0) return 176; // 기본 높이

      const maxLayer = getGlobalMaxLayer();
      const maxY = BASE_TIME_Y_COORDINATE + (maxLayer - 1) * WORK_BLOCK_HEIGHT;

      // 최소 높이 176px 보장
      return Math.max(maxY, 176);
    }, [workBlocks]);

    return (
      <>
        <div css={S.WorkCellsContainerWrapper(dynamicHeight)}>
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
