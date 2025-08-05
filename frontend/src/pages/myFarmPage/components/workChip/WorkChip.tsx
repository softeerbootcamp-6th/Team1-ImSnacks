import {
  WORK_CHIP_TYPES,
  type WorkChipType,
  type WorkChipStatus,
} from '@/types/workCardWeb.type';
import S from './WorkChip.style';
import type { ButtonHTMLAttributes } from 'react';

export interface WorkChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  chipType: WorkChipType;
  status: WorkChipStatus;
}

const WorkChip = ({ chipType, status, ...props }: WorkChipProps) => {
  return (
    <button
      css={[S.WorkChip, S.getWorkChipColorByType(chipType, status)]}
      {...props}
    >
      <div
        css={[S.WorkChipDot, S.getWorkChipDotColorByType(chipType, status)]}
      />
      {chipType === WORK_CHIP_TYPES.COMPLETE ? '완료' : '미완료'}
    </button>
  );
};

export default WorkChip;
