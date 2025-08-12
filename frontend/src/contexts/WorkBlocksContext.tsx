import { createContext } from 'react';
import type { WorkBlockType } from '@/types/workCard.type';

export interface WorkBlocksContextType {
  workBlocks: WorkBlockType[];
  addWorkBlock: (newWorkBlock: WorkBlockType) => void;
  updateWorkBlocks: (updatedBlocks: WorkBlockType[]) => void;
  removeWorkBlock: (id: number | string) => void;
}

export const WorkBlocksContext = createContext<WorkBlocksContextType>({
  workBlocks: [],
  addWorkBlock: () => {},
  updateWorkBlocks: () => {},
  removeWorkBlock: () => {},
});
