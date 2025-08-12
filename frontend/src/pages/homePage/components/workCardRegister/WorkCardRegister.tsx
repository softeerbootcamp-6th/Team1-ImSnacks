import S from './WorkCardRegister.style';
import WorkCardRegisterContent from '../workCardRegisterContent/WorkCardRegisterContent';
import useVisibility from '@/hooks/useVisibility';

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
      <WorkCardRegisterContent
        cropName={cropName}
        workName={workName}
        workTime={workTime}
        isVisible={isVisible}
        isDragging={isDragging}
        onDelete={onDelete}
      />
    </div>
  );
};

export default WorkCardRegister;
