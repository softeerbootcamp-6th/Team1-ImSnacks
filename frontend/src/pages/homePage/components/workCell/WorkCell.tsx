import S from './WorkCell.style';
import type { WorkCellType, WorkCellStatus } from '@/types/workCell.type';

interface WorkCellProps {
  type: WorkCellType;
  status: WorkCellStatus;
}

const WorkCell = ({ type, status }: WorkCellProps) => {
  return <div css={S.workCell(type, status)} />;
};

export default WorkCell;
