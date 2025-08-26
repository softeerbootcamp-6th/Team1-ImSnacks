export const calculateHeightRatio = (precipitation: number): number => {
  if (precipitation <= 0) return 0;
  if (precipitation >= 30) return 1;
  return precipitation / 30;
};
