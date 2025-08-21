import S from './WorkCardRegisterContent.style';
import type { CropNameType } from '@/types/crop.type';
import { WORK_CHIP_TYPES, type WorkChipType } from '@/types/workChip.type';

interface WorkCardRegisterProps {
  id?: number;
  cropName: string;
  workName: string;
  workTime: string;
  width?: number;
  status?: WorkChipType;
}

const WorkCardRegisterContent = ({
  width = 150,
  cropName,
  workName,
  workTime,
  status = WORK_CHIP_TYPES.INCOMPLETED,
}: WorkCardRegisterProps) => {
  const isCompleted = status === WORK_CHIP_TYPES.COMPLETED;

  return (
    <div css={S.WorkCardContent}>
      <div css={S.WorkCardColorBar(cropName as CropNameType)} />
      <div css={S.WorkCardInfo}>
        <div css={S.WorkCardContentWrapper(width)}>
          {width && width > 80 && (
            <div css={[S.WorkCardTitle, isCompleted && S.CompletedTextStyle]}>
              {workName}
            </div>
          )}
          {width && width > 120 && (
            <div
              css={[S.WorkCardCropName, isCompleted && S.CompletedTextStyle]}
            >
              {cropName}
            </div>
          )}
        </div>
        {width && width > 80 && (
          <div css={[S.WorkCardTime, isCompleted && S.CompletedTextStyle]}>
            {workTime}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkCardRegisterContent;
