import S from './WorkCardRegister.style';
import WorkCardRegisterContent from '../workCardRegisterContent/WorkCardRegisterContent';
import useVisibility from '@/hooks/useVisibility';
import { css } from '@emotion/react';

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
  onDelete?: () => void;
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
  onDelete,
}: WorkCardRegisterProps) => {
  const { show, hide, isVisible } = useVisibility();
  return (
    <div
      css={S.WorkCardContainer({ isDragging, x, y, width })}
      onMouseDown={onMouseDown}
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
        `}
      >
        <WorkCardRegisterContent
          cropName={cropName}
          workName={workName}
          workTime={workTime}
        />
        {isVisible && !isDragging && (
          <button
            onClick={onDelete}
            onMouseDown={e => e.stopPropagation()}
            css={S.WorkCardDeleteButton}
          >
            삭제
          </button>
        )}
      </div>
    </div>
  );
};

export default WorkCardRegister;
