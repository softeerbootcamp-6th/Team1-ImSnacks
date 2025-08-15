import { create } from 'zustand';

export const useUserStore = create(set => ({
  nickName: '',
  setNickName: (nickName: string) => set({ nickName }),
  resetNickName: () => set({ nickName: '' }),
}));
