import useWorkBlocks from '@/contexts/useWorkBlocks';
import calculateTimeToPosition from '../../utils/calculateTimeToPosition';
import * as S from './WorkActiveToolTip.style';

const WorkActiveToolTip = () => {
  const { selectedRecommendedWork } = useWorkBlocks();

  const { x, width } = calculateTimeToPosition(
    selectedRecommendedWork?.startTime || '',
    selectedRecommendedWork?.endTime || ''
  );

  if (!selectedRecommendedWork) return;

  return (
    <div css={S.WorkActiveToolTipContainer(x, width)}>
      <div css={S.WorkActiveToolTipText}>
        {selectedRecommendedWork.recommendation}
      </div>
    </div>
  );
};

export default WorkActiveToolTip;
