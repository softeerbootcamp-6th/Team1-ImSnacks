import S from './WorkCardRegister.style';
import WorkCardRegisterContent from '../workCardRegisterContent/WorkCardRegisterContent';

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
      <WorkCardRegisterContent
        cropName={cropName}
        workName={workName}
        workTime={workTime}
      />
    </div>
  );
};

export default WorkCardRegister;
