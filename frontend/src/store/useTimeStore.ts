import dayjs from 'dayjs';
import { create } from 'zustand';

export const useTimeStore = create<{
  currentTime: dayjs.Dayjs;
  setCurrentTime: (time: dayjs.Dayjs) => void;
  resetCurrentTime: () => void;
  increaseTime: () => void;
}>(set => ({
  currentTime: dayjs(),
  setCurrentTime: (time: dayjs.Dayjs) => set({ currentTime: time }),
  resetCurrentTime: () => set({ currentTime: dayjs() }),
  increaseTime: () =>
    set(state => ({ currentTime: state.currentTime.add(1, 'minute') })),
}));
