import { create } from 'zustand';
import {
  BASE_TIME_Y_COORDINATE,
  WORK_BLOCK_Y_COORDINATE_GAP,
} from '@/constants/workTimeCoordinate';

interface MaxLayerState {
  maxLayer: number;
  setMaxLayer: (maxLayer: number) => void;
  updateMaxLayerFromWorkBlocks: (
    workBlocks: { position: { y: number } }[]
  ) => void;
}

const useMaxLayerStore = create<MaxLayerState>(set => ({
  maxLayer: 1,
  setMaxLayer: (maxLayer: number) => set({ maxLayer }),
  updateMaxLayerFromWorkBlocks: (workBlocks: { position: { y: number } }[]) => {
    if (workBlocks.length === 0) {
      set({ maxLayer: 1 });
      return;
    }

    const maxY = Math.max(...workBlocks.map(block => block.position.y));
    const newMaxLayer =
      Math.ceil((maxY - BASE_TIME_Y_COORDINATE) / WORK_BLOCK_Y_COORDINATE_GAP) +
      1;

    set({ maxLayer: newMaxLayer });
  },
}));

export default useMaxLayerStore;
