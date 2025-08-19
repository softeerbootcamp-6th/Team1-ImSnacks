import { createContext } from 'react';
import type { WorkBlockType } from '@/types/workCard.type';
import type { RecommendedWorksResponse } from '@/types/openapiGenerator';

export interface WorkBlocksContextType {
  workBlocks: WorkBlockType[];
  addWorkBlock: (newWorkBlock: WorkBlockType) => void;
  updateWorkBlocks: (updatedBlocks: WorkBlockType[]) => void;
  removeWorkBlock: (id: number | string) => void;
  selectedRecommendedWork: RecommendedWorksResponse | null;
  setSelectedRecommendedWork: (work: RecommendedWorksResponse | null) => void;
}

const WorkBlocksContext = createContext<WorkBlocksContextType>({
  workBlocks: [],
  addWorkBlock: () => {},
  updateWorkBlocks: () => {},
  removeWorkBlock: () => {},
  selectedRecommendedWork: null,
  setSelectedRecommendedWork: () => {},
});

export default WorkBlocksContext;
