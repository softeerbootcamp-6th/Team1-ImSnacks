import type { WorkChipType } from '@/types/workChip.type';
import MobileWorkCard from '../mobileWorkCard/MobileWorkCard';
import S from './MobileTodo.style';
import { useEffect, useState } from 'react';
import { getMyWorkOfToday } from '@/apis/myWork.api';
import type { GetMyWorksOfTodayResponse } from '@/types/openapiGenerator';

const MobileTodo = () => {
  const [todoList, setTodoList] = useState<GetMyWorksOfTodayResponse[]>();

  const fetchTodayWork = async () => {
    try {
      const res = await getMyWorkOfToday(true);
      if (res.data) {
        setTodoList(res.data);
        console.log('오늘의 작업:', res.data);
      }
    } catch (error) {
      console.error("Error fetching today's work:", error);
    }
  };
  useEffect(() => {
    fetchTodayWork();
  }, []);

  return (
    <div css={S.MobileTodo}>
      <h2>오늘 예정된 할 일이에요</h2>
      <div css={S.MobileTodoList}>
        {todoList?.map(todo => (
          <MobileWorkCard
            key={todo?.myWorkId}
            workId={todo?.myWorkId}
            cropName={todo?.myCropName ?? ''}
            workName={todo?.myWorkName ?? ''}
            workTime={todo?.workTime ?? ''}
            status={todo?.status as WorkChipType}
            onClick={() => console.log(`Work ID: ${todo?.myWorkId}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default MobileTodo;
