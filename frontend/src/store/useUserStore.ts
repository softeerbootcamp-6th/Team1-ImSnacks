import { create } from 'zustand';

export const useUserStore = create<{
  nickName: string;
  setNickName: (nickName: string) => void;
  resetNickName: () => void;
}>(set => ({
  nickName: '',
  setNickName: (nickName: string) => set({ nickName }),
  resetNickName: () => set({ nickName: '' }),
}));
