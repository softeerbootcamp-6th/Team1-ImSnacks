import { useEffect, useState } from 'react';
import type { RecommendedWorksResponse } from '@/types/openapiGenerator';
import type { WorkBlockType } from '@/types/workCard.type';
import { getMyWorkOfToday, deleteMyWork } from '@/apis/myWork.api';
import getInitialWorkBlocks from '@/pages/homePage/utils/getInitialWorkBlocks';

const useWorkBlocks = () => {
  const [workBlocks, setWorkBlocks] = useState<WorkBlockType[]>([]);

  useEffect(() => {
    const fetchMyWorkOfToday = async () => {
      const res = await getMyWorkOfToday(false);
      setWorkBlocks(getInitialWorkBlocks(res.data));
    };
    try {
      fetchMyWorkOfToday();
    } catch (error) {
      console.error('오늘 내 농작업 일정 조회 실패', error);
    }
  }, []);

  const addWorkBlock = (newWorkBlock: WorkBlockType) => {
    setWorkBlocks(prev => [...prev, newWorkBlock]);
  };

  const updateWorkBlocks = (updatedBlocks: WorkBlockType[]) => {
    setWorkBlocks(updatedBlocks);
  };

  const removeWorkBlock = async (id: number | string) => {
    try {
      await deleteMyWork({
        myWorkId: Number(id),
      });
      setWorkBlocks(prev => prev.filter(block => block.id !== Number(id)));
    } catch (error) {
      console.error('작업 삭제 실패', error);
    }
  };

  const [selectedRecommendedWork, setSelectedRecommendedWork] =
    useState<RecommendedWorksResponse | null>(null);

  return {
    workBlocks,
    addWorkBlock,
    updateWorkBlocks,
    removeWorkBlock,
    selectedRecommendedWork,
    setSelectedRecommendedWork,
  };
};

export default useWorkBlocks;
