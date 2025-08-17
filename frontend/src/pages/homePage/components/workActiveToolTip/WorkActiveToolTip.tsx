import useWorkBlocks from '@/pages/homePage/contexts/useWorkBlocks';
import calculateTimeToPosition from '../../utils/calculateTimeToPosition';
import * as S from './WorkActiveToolTip.style';

const WorkActiveToolTip = () => {
  const { selectedRecommendedWork } = useWorkBlocks();

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
            css={S.WorkActiveToolTipContainer(x, width)}
          >
            <div css={S.WorkActiveToolTipText}>{duration.recommendation}</div>
          </div>
        );
      })}
    </>
  );
};

export default WorkActiveToolTip;
