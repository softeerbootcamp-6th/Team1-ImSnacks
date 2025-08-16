import { createContext, type RefObject } from 'react';
import type { WorkBlockType } from '@/types/workCard.type';
import type { RecommendedWorksResponse } from '@/types/openapiGenerator';

export interface WorkBlocksContextType {
  workBlocks: WorkBlockType[];
  addWorkBlock: (newWorkBlock: WorkBlockType) => void;
  updateWorkBlocks: (updatedBlocks: WorkBlockType[]) => void;
  removeWorkBlock: (id: number | string) => void;
  containerRef: RefObject<HTMLDivElement | null>;
  scrollOffset: number;
  setScrollOffset: (offset: number) => void;
  selectedRecommendedWork: RecommendedWorksResponse | null;
  setSelectedRecommendedWork: (work: RecommendedWorksResponse | null) => void;
}

const WorkBlocksContext = createContext<WorkBlocksContextType>({
  workBlocks: [],
  addWorkBlock: () => {},
  updateWorkBlocks: () => {},
  removeWorkBlock: () => {},
  containerRef: { current: null },
  scrollOffset: 0,
  setScrollOffset: () => {},
  selectedRecommendedWork: null,
  setSelectedRecommendedWork: () => {},
});

export default WorkBlocksContext;
