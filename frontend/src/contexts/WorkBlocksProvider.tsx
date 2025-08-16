import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { WorkBlockType } from '@/types/workCard.type';
import getInitialWorkBlocks from '@/pages/homePage/utils/getInitialWorkBlocks';
import WorkBlocksContext, {
  type WorkBlocksContextType,
} from './WorkBlocksContext';
import type { RecommendedWorksResponse } from '@/types/openapiGenerator';

const WorkBlocksProvider = ({ children }: { children: ReactNode }) => {
  const [workBlocks, setWorkBlocks] = useState<WorkBlockType[]>(
    getInitialWorkBlocks()
  );

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

  const [selectedRecommendedWork, setSelectedRecommendedWork] =
    useState<RecommendedWorksResponse | null>(null);

  useEffect(() => {
    console.log('🔄 selectedRecommendedWork 변경됨:', {
      work: selectedRecommendedWork,
      workName: selectedRecommendedWork?.workName,
      workId: selectedRecommendedWork?.workId,
      timestamp: new Date().toISOString(),
    });
  }, [selectedRecommendedWork]);

  const value: WorkBlocksContextType = {
    workBlocks,
    addWorkBlock,
    updateWorkBlocks,
    removeWorkBlock,
    containerRef,
    selectedRecommendedWork,
    setSelectedRecommendedWork,
  };

  return (
    <WorkBlocksContext.Provider value={value}>
      {children}
    </WorkBlocksContext.Provider>
  );
};

export default WorkBlocksProvider;
