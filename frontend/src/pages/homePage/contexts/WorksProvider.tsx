import { useEffect, useMemo, useState, type ReactNode } from 'react';
import type { WorkBlockType } from '@/types/workCard.type';
import getInitialWorkBlocks from '@/pages/homePage/utils/getInitialWorkBlocks';
import WorkBlocksContext from './WorkBlocksContext';
import type { RecommendedWorksResponse } from '@/types/openapiGenerator';
import { deleteMyWork, getMyWorkOfToday } from '@/apis/myWork.api';

const WorksProvider = ({ children }: { children: ReactNode }) => {
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

  const value = useMemo(
    () => ({
      workBlocks,
      addWorkBlock,
      updateWorkBlocks,
      removeWorkBlock,
      selectedRecommendedWork,
      setSelectedRecommendedWork,
    }),
    [workBlocks, selectedRecommendedWork]
  );

  return (
    <WorkBlocksContext.Provider value={value}>
      {children}
    </WorkBlocksContext.Provider>
  );
};

export default WorksProvider;
