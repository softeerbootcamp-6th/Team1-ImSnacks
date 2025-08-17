import WorkChip from '../workChip/WorkChip';
import { type WorkChipType } from '@/types/workChip.type';
import S from './WorkCardWeb.style';

interface WorkCardWebProps {
  cropName: string;
  workName: string;
  workTime: string;
  status: WorkChipType;
}

const WorkCardWeb = ({
  cropName,
  workName,
  workTime,
  status,
}: WorkCardWebProps) => {
  return (
    <div css={S.WorkCardContainer}>
      <div css={S.WorkCardContent}>
        <div css={S.WorkCardColorBar(cropName)} />
        <div css={S.WorkCardInfo}>
          <div css={S.WorkCardTitle}>{workName}</div>
          <div css={S.WorkCardCropName}>{cropName}</div>
          <div css={S.WorkCardTime}>{workTime}</div>
        </div>
      </div>
      <WorkChip chipType={status} />
    </div>
  );
};

export default WorkCardWeb;
