import { Spacing } from '@/styles/spacing';
import { FlexStyles } from '@/styles/commonStyles';
import { css } from '@emotion/react';
import S from './WorkCardRegisterContent.style';
import type { CropNameType } from '@/types/crop.type';

interface WorkCardRegisterProps {
  id?: number;
  cropName: string;
  workName: string;
  workTime: string;
  width?: number;
}

const WorkCardRegisterContent = ({
  cropName,
  workName,
  workTime,
}: WorkCardRegisterProps) => {
  return (
    <div css={S.WorkCardContent}>
      <div css={S.WorkCardColorBar(cropName as CropNameType)} />
      <div css={S.WorkCardInfo}>
        <div
          css={css`
            ${FlexStyles.flexRow} gap:${Spacing.Spacing300}
          `}
        >
          <div css={S.WorkCardTitle}>{workName}</div>
          <div css={S.WorkCardCropName}> {cropName}</div>
        </div>
        <div css={S.WorkCardTime}>{workTime}</div>
      </div>
    </div>
  );
};

export default WorkCardRegisterContent;
