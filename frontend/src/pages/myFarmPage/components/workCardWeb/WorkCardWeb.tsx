import WorkChip from '../workChip/WorkChip';
import { WORK_CHIP_TYPES } from '@/types/workChip.type';
import S from './WorkCardWeb.style';
import type { CropNameType } from '@/types/crop.type';

interface WorkCardWebProps {
  cropName: CropNameType;
  workName: string;
  workTime: string;
  isCompleted: boolean;
}

const WorkCardWeb = ({
  cropName,
  workName,
  workTime,
  isCompleted,
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
        chipType={
          isCompleted ? WORK_CHIP_TYPES.COMPLETED : WORK_CHIP_TYPES.INCOMPLETED
        }
      />
    </div>
  );
};

export default WorkCardWeb;
