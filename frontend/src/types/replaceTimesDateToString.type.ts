export type ReplaceTimesDateToString<T> = Omit<T, 'startTime' | 'endTime'> & {
  startTime: string;
  endTime: string;
};
