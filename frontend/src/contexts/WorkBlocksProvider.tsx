import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { WorkBlockType } from '@/types/workCard.type';
import getInitialWorkBlocks from '@/pages/homePage/utils/getInitialWorkBlocks';
import WorkBlocksContext, {
  type WorkBlocksContextType,
} from './WorkBlocksContext';
import type {
  GetMyWorksOfTodayResponse,
  RecommendedWorksResponse,
} from '@/types/openapiGenerator';
import { getMyWorkOfToday } from '@/apis/myWork.api';

const WorkBlocksProvider = ({ children }: { children: ReactNode }) => {
  const [workBlocks, setWorkBlocks] = useState<WorkBlockType[]>([]);

  useEffect(() => {
    const fetchMyWorkOfToday = async () => {
      const res = await getMyWorkOfToday(false);
      setWorkBlocks(
        getInitialWorkBlocks(res.data as GetMyWorksOfTodayResponse[])
      );
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

  const removeWorkBlock = (id: number | string) => {
    setWorkBlocks(blocks => blocks.filter(b => b.id !== id));
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  const [selectedRecommendedWork, setSelectedRecommendedWork] =
    useState<RecommendedWorksResponse | null>(null);

  const value: WorkBlocksContextType = {
    workBlocks,
    addWorkBlock,
    updateWorkBlocks,
    removeWorkBlock,
    containerRef,
    selectedRecommendedWork,
    setSelectedRecommendedWork,
    scrollOffset,
    setScrollOffset,
  };

  return <WorkBlocksContext value={value}>{children}</WorkBlocksContext>;
};

export default WorkBlocksProvider;
