import { create } from 'zustand';

export const useIsMobileStore = create<{
  isMobile: boolean;
  setIsMobile: (isMobile: boolean) => void;
}>(set => ({
  isMobile: false,
  setIsMobile: (isMobile: boolean) => set({ isMobile }),
}));
