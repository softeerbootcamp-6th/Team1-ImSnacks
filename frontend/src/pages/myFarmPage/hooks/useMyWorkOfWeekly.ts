import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { getMyWorkOfWeekly, patchMyWorkStatus } from '@/apis/myWork.api';
import { groupDataRecordStructure } from '@/utils/groupDataRecord';
import {
  UpdateMyWorkStatusRequestStatusEnum,
  type WorkCardData,
} from '@/types/openapiGenerator';

export const useMyWorkOfWeekly = (weekDates: Date[]) => {
  const [myWorkOfWeekly, setMyWorkOfWeekly] =
    useState<Record<string, WorkCardData[]>>();

  useEffect(() => {
    const fetchMyWorkOfWeekly = async () => {
      if (weekDates.length > 0) {
        const res = await getMyWorkOfWeekly(
          dayjs(weekDates[0]).format('YYYY-MM-DD')
        );
        setMyWorkOfWeekly(
          groupDataRecordStructure(res.data, 'date', 'workCardData') as Record<
            string,
            WorkCardData[]
          >
        );
      }
    };
    fetchMyWorkOfWeekly();
  }, [weekDates]);

  const [isExpanded, setIsExpanded] = useState(false);

  const MAX_VISIBLE_CARDS = 5;

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  const hasMoreWorks = Object.values(myWorkOfWeekly ?? {}).some(
    dayData => dayData.length > MAX_VISIBLE_CARDS
  );

  const handleCheckButton = async (
    myWorkId: number,
    currentStatus: UpdateMyWorkStatusRequestStatusEnum,
    dateKey: string
  ) => {
    try {
      const nextStatus =
        currentStatus === UpdateMyWorkStatusRequestStatusEnum.Incompleted
          ? UpdateMyWorkStatusRequestStatusEnum.Completed
          : UpdateMyWorkStatusRequestStatusEnum.Incompleted;

      const res = await patchMyWorkStatus({ myWorkId, status: nextStatus });

      if (res.code === 200) {
        setMyWorkOfWeekly(prev => {
          if (!prev) return prev;
          const dayList = prev[dateKey] ?? [];
          const updatedDayList = dayList.map(work =>
            work.myWorkId === myWorkId ? { ...work, status: nextStatus } : work
          );
          return { ...prev, [dateKey]: updatedDayList };
        });
      }
    } catch (error) {
      console.error('작업 일정 업데이트 실패: ', error);
    }
  };

  return {
    myWorkOfWeekly,
    isExpanded,
    setIsExpanded,
    hasMoreWorks,
    handleExpandClick,
    handleCheckButton,
  };
};
