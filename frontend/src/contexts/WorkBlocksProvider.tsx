import { useState, type ReactNode } from 'react';
import type { WorkBlockType } from '@/types/workCard.type';
import getInitialWorkBlocks from '@/pages/homePage/utils/getInitialWorkBlocks';
import {
  WorkBlocksContext,
  type WorkBlocksContextType,
} from './WorkBlocksContext';

interface WorkBlocksProviderProps {
  children: ReactNode;
}

const WorkBlocksProvider = ({ children }: WorkBlocksProviderProps) => {
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

  const value: WorkBlocksContextType = {
    workBlocks,
    addWorkBlock,
    updateWorkBlocks,
    removeWorkBlock,
  };

  return <WorkBlocksContext value={value}>{children}</WorkBlocksContext>;
};

export default WorkBlocksProvider;
