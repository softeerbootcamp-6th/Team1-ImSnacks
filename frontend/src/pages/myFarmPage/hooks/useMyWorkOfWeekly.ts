import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { getMyWorkOfWeekly } from '@/apis/myWork.api';
import { groupDataRecordStructure } from '@/utils/groupDataRecord';
import type { WorkCardData } from '@/types/openapiGenerator';

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

  return {
    myWorkOfWeekly,
    isExpanded,
    setIsExpanded,
    hasMoreWorks,
    handleExpandClick,
  };
};
