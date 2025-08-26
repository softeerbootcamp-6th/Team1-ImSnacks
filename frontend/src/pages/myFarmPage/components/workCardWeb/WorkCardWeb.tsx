import WorkChip from '../workChip/WorkChip';
import { type WorkChipType } from '@/types/workChip.type';
import S from './WorkCardWeb.style';

interface WorkCardWebProps {
  id: number;
  cropName: string;
  workName: string;
  workTime: string;
  status: WorkChipType;
  dateKey: string;
  handleCheckButton: (
    id: number,
    status: WorkChipType,
    dateKey: string
  ) => void;
}

const WorkCardWeb = ({
  id,
  cropName,
  workName,
  workTime,
  status,
  dateKey,
  handleCheckButton,
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
      <WorkChip
        chipType={status}
        onClick={() => handleCheckButton(id, status, dateKey)}
      />
    </div>
  );
};

export default WorkCardWeb;
