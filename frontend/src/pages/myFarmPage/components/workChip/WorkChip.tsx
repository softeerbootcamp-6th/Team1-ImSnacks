import { WORK_CHIP_TYPES, type WorkChipType } from '@/types/workChip.type';
import S from './WorkChip.style';
import type { ButtonHTMLAttributes } from 'react';

export interface WorkChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  chipType: WorkChipType;
}

const WorkChip = ({ chipType, ...props }: WorkChipProps) => {
  return (
    <button css={S.WorkChip(chipType)} {...props}>
      <div css={S.WorkChipDot(chipType)} />
      {chipType === WORK_CHIP_TYPES.COMPLETE ? '완료' : '미완료'}
    </button>
  );
};

export default WorkChip;
