import type { RecommendedWorksResponse } from '@/types/openapiGenerator';
import calculateTimeToPosition from '../../utils/calculateTimeToPosition';
import * as S from './WorkActiveToolTip.style';
import { useTheme } from '@emotion/react';

const WorkActiveToolTip = ({
  selectedRecommendedWork,
  workCellsContainerHeight,
}: {
  selectedRecommendedWork: RecommendedWorksResponse | null;
  workCellsContainerHeight: number;
}) => {
  const theme = useTheme();

  if (!selectedRecommendedWork) return;

  return (
    <>
      {selectedRecommendedWork?.recommendationDurations?.map(duration => {
        const { x, width } = calculateTimeToPosition(
          duration.startTime || '',
          duration.endTime || ''
        );
        return (
          <div
            key={`${duration.startTime}-${duration.endTime}`}
            css={S.WorkActiveToolTipContainer(
              x,
              width,
              theme,
              workCellsContainerHeight
            )}
          >
            <div css={S.WorkActiveToolTipText(theme)}>
              {duration.recommendation}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default WorkActiveToolTip;
