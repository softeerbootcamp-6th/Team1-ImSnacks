import { useState } from 'react';
import { IC24DragIcon } from '@/assets/icons/flat';
import S from './WorkCell.style';
import { ColorPrimary } from '@/styles/colors';
import type { WorkCellType, WorkCellStatus } from '@/types/workCell.type';

interface WorkCellProps {
  type: WorkCellType;
  status: WorkCellStatus;
}

const WorkCell = ({ type, status }: WorkCellProps) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      css={S.workCell(type, status, isHovered)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div css={S.HoverCell}>
          <div css={S.DragIcon}>
            <IC24DragIcon width={24} height={24} fill={ColorPrimary.B300} />
          </div>
          <p>작업 일정을{'\n'}클릭 하세요</p>
        </div>
      )}
    </div>
  );
};

export default WorkCell;
