import { Spacing } from '@/styles/spacing';
import { FlexStyles } from '@/styles/commonStyles';
import { css } from '@emotion/react';
import S from './WorkCardRegister.style';

interface WorkCardRegisterProps {
  id?: number;
  cropName: string;
  workName: string;
  workTime: string;
  isDragging?: boolean;
  style?: React.CSSProperties;
  onMouseDown?: (e: React.MouseEvent) => void;
  width?: number;
}

const WorkCardRegister = ({
  cropName,
  workName,
  workTime,
  isDragging = false,
  style,
  onMouseDown,
  width,
}: WorkCardRegisterProps) => {
  return (
    <div
      css={S.WorkCardContainer(isDragging)}
      style={{
        ...style,
        width: width ? `${width}px` : 'auto',
      }}
      onMouseDown={onMouseDown}
    >
      <div css={S.WorkCardContent}>
        <div css={S.WorkCardColorBar(cropName)} />
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
