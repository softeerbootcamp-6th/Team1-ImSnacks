import MobileWorkCard from '../mobileWorkCard/MobileWorkCard';
import S from './MobileTodo.style';
import { useEffect, useState } from 'react';
import { getMyWorkOfToday, patchMyWorkStatus } from '@/apis/myWork.api';
import {
  UpdateMyWorkStatusRequestStatusEnum,
  type GetMyWorksOfTodayResponse,
} from '@/types/openapiGenerator';

const MobileTodo = () => {
  const [todoList, setTodoList] = useState<GetMyWorksOfTodayResponse[]>();

  const fetchTodayWork = async () => {
    try {
      const res = await getMyWorkOfToday(true);
      if (res.data) {
        setTodoList(res.data);
      }
    } catch (error) {
      console.error("Error fetching today's work:", error);
    }
  };
  useEffect(() => {
    fetchTodayWork();
  }, []);

  const handleCheckButton = async (
    myWorkId: number,
    status: UpdateMyWorkStatusRequestStatusEnum
  ) => {
    try {
      const changedStatus =
        status === UpdateMyWorkStatusRequestStatusEnum.Incompleted
          ? UpdateMyWorkStatusRequestStatusEnum.Completed
          : UpdateMyWorkStatusRequestStatusEnum.Incompleted;

      const res = await patchMyWorkStatus({ myWorkId, status: changedStatus });

      if (res.code === 200) {
        setTodoList(prevList => {
          const updatedList = prevList?.map(todo =>
            todo.myWorkId === myWorkId
              ? { ...todo, status: changedStatus }
              : todo
          );
          return updatedList;
        });
      }
    } catch (error) {
      console.error('Error updating work status:', error);
    }
  };

  return (
    <div css={S.MobileTodo}>
      <h2>오늘 예정된 할 일이에요</h2>
      <div css={S.MobileTodoList}>
        {todoList?.map((todo: GetMyWorksOfTodayResponse) => (
          <MobileWorkCard
            key={todo?.myWorkId}
            workId={todo?.myWorkId}
            cropName={todo?.myCropName ?? ''}
            workName={todo?.myWorkName ?? ''}
            workTime={todo?.workTime ?? ''}
            status={
              todo?.status ?? UpdateMyWorkStatusRequestStatusEnum.Incompleted
            }
            onClick={() => {
              if (
                typeof todo?.myWorkId === 'number' &&
                typeof todo?.status === 'string'
              ) {
                handleCheckButton(todo.myWorkId, todo.status);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default MobileTodo;
