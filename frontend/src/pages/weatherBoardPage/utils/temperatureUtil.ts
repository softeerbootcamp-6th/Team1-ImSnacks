import { ColorPrimary, ColorStatus } from '@/styles/colors';

export const getTemperatureColor = (temperature: number): string => {
  if (temperature >= 30) return ColorStatus.Global.Red;
  if (temperature >= 20) return ColorStatus.Global.Orange;
  if (temperature >= 10) return ColorStatus.Global.Yellow;
  if (temperature >= 0) return ColorPrimary.B300;
  return ColorPrimary.B500;
};
