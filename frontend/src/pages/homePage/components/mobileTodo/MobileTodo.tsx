import type { WorkChipType } from '@/types/workChip.type';
import MobileWorkCard from '../mobileWorkCard/MobileWorkCard';
import S from './MobileTodo.style';

interface MobileTodoProps {
  id: number;
  cropName: string;
  workName: string;
  workTime: string;
  status: string;
}

interface MobileTodoComponentProps {
  todoList: MobileTodoProps[];
}

const MobileTodo = ({ todoList }: MobileTodoComponentProps) => {
  return (
    <div css={S.MobileTodo}>
      <h2>오늘 예정된 할 일이에요</h2>
      <div css={S.MobileTodoList}>
        {todoList.map(todo => (
          <MobileWorkCard
            key={todo.id}
            workId={todo.id}
            cropName={todo.cropName}
            workName={todo.workName}
            workTime={todo.workTime}
            status={todo.status as WorkChipType}
            onClick={() => console.log(`Work ID: ${todo.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default MobileTodo;
