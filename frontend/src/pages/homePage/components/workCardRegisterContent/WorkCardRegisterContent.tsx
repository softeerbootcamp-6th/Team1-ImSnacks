import S from './WorkCardRegisterContent.style';
import type { CropNameType } from '@/types/crop.type';
import { WORK_CHIP_TYPES, type WorkChipType } from '@/types/workChip.type';
import WorkCardRegisterS from '../workCardRegister/WorkCardRegister.style';
import PortalToolTip from '@/components/common/PortalToolTip';
import { useRef } from 'react';

interface WorkCardRegisterProps {
  id?: number;
  cropName: string;
  workName: string;
  workTime: string;
  width?: number;
  status?: WorkChipType;
  isToolTipVisible?: boolean;
}

const WorkCardRegisterContent = ({
  width = 150,
  cropName,
  workName,
  workTime,
  status = WORK_CHIP_TYPES.INCOMPLETED,
  isToolTipVisible = false,
}: WorkCardRegisterProps) => {
  const isCompleted = status === WORK_CHIP_TYPES.COMPLETED;

  const anchorRef = useRef<HTMLDivElement>(null);

  return (
    <div css={S.WorkCardContent} ref={anchorRef}>
      {width < 145 && isToolTipVisible && (
        <PortalToolTip
          anchorRef={anchorRef}
          direction={'Top'}
          content={
            <div css={WorkCardRegisterS.WorkCardToolTip}>
              <div css={WorkCardRegisterS.WorkCardToolTipContent}>
                <div css={WorkCardRegisterS.WorkCardToolTipTitle}>
                  {workName}
                </div>
                <div css={WorkCardRegisterS.WorkCardToolTipCropName}>
                  {cropName}
                </div>
              </div>
              <div css={WorkCardRegisterS.WorkCardToolTipTime}>{workTime}</div>
            </div>
          }
          type="Default"
          offset={100}
        />
      )}
      <div css={S.WorkCardColorBar(cropName as CropNameType)} />
      <div css={S.WorkCardInfo}>
        <div css={S.WorkCardContentWrapper}>
          {width > 80 && (
            <div css={[S.WorkCardTitle, isCompleted && S.CompletedTextStyle]}>
              {workName}
            </div>
          )}
          {width > 120 && (
            <div
              css={[S.WorkCardCropName, isCompleted && S.CompletedTextStyle]}
            >
              {cropName}
            </div>
          )}
        </div>
        {width > 80 && (
          <div css={[S.WorkCardTime, isCompleted && S.CompletedTextStyle]}>
            {workTime}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkCardRegisterContent;
