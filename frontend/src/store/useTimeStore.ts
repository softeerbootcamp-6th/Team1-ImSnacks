import dayjs from 'dayjs';
import { create } from 'zustand';

export const useTimeStore = create(set => ({
  currentTime: dayjs(),
  setCurrentTime: (time: dayjs.Dayjs) => set({ currentTime: time }),
  resetCurrentTime: () => set({ currentTime: dayjs() }),

  increaseTime: () => set({ currentTime: dayjs().add(1, 'minute') }),
}));
