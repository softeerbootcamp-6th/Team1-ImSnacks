import { create } from 'zustand';

interface MaxLayerState {
  maxLayer: number;
  setMaxLayer: (maxLayer: number) => void;
}

const useMaxLayerStore = create<MaxLayerState>(set => ({
  maxLayer: 1,
  setMaxLayer: (maxLayer: number) => set({ maxLayer }),
}));

export default useMaxLayerStore;
