import { useState } from 'react';
import DragIcon from '@/assets/icons/flat/IC24Drag.svg?react';
import S from './WorkCell.style';
import { ColorPrimary } from '@/styles/colors';
import type { WorkCellType, WorkCellStatus } from '@/types/workCell.types';

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
            <DragIcon width={24} height={24} fill={ColorPrimary.B300} />
          </div>
          작업 일정을{'\n'}드래그 하세요
        </div>
      )}
    </div>
  );
};

export default WorkCell;
