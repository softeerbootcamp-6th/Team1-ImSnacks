import { create } from 'zustand';

export const useTokenStore = create<{
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  removeAccessToken: () => void;
}>(set => ({
  accessToken: null,
  setAccessToken: (token: string) => set({ accessToken: token }),
  removeAccessToken: () => set({ accessToken: null }),
}));
