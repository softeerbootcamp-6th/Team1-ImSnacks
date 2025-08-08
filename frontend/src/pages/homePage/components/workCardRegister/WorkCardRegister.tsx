import { Spacing } from '@/styles/spacing';
import { FlexStyles } from '@/styles/commonStyles';
import { css } from '@emotion/react';
import S from './WorkCardRegister.style';
import type { CropNameType } from '@/types/crop.type';

interface WorkCardRegisterProps {
  id?: number;
  cropName: string;
  workName: string;
  workTime: string;
  isDragging?: boolean;
  x?: number;
  y?: number;
  onMouseDown?: (e: React.MouseEvent) => void;
  width?: number;
}

const WorkCardRegister = ({
  cropName,
  workName,
  workTime,
  isDragging = false,
  x = 0,
  y = 0,
  onMouseDown,
  width,
}: WorkCardRegisterProps) => {
  return (
    <div
      css={S.WorkCardContainer({ isDragging, x, y, width })}
      onMouseDown={onMouseDown}
    >
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
    </div>
  );
};

export default WorkCardRegister;
