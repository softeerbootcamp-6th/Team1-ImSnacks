import {
  WORK_CHIP_TYPES,
  type WorkChipType,
  type WorkChipStatus,
} from '@/types/workCardWeb.type';
import S from './WorkChip.style';

export interface WorkChipProps {
  type: WorkChipType;
  status: WorkChipStatus;
}

const WorkChip = ({ type, status }: WorkChipProps) => {
  return (
    <div css={[S.WorkChip, S.getWorkChipColorByType(type, status)]}>
      <div css={[S.WorkChipDot, S.getWorkChipDotColorByType(type, status)]} />
      {type === WORK_CHIP_TYPES.COMPLETE ? '완료' : '미완료'}
    </div>
  );
};

export default WorkChip;
