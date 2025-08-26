import { ColorStatus } from '@/styles/colors';

export const getUVLevelAndColor = (
  value: number
): { level: string; color: string } => {
  if (value < 3) return { level: '낮음', color: ColorStatus.Global.Green };
  if (value < 6) return { level: '보통', color: ColorStatus.Global.Yellow };
  if (value < 8) return { level: '높음', color: ColorStatus.Global.Orange };
  if (value < 11) return { level: '매우높음', color: ColorStatus.Global.Red };
  return { level: '위험', color: ColorStatus.Global.Red };
};
