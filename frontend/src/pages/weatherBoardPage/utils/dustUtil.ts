import { ColorPrimary, ColorStatus } from '@/styles/colors';

export const getFineDustLevelAndColor = (value: number) => {
  if (value < 30) return { level: '좋음', color: ColorPrimary.B400 };
  if (value < 80) return { level: '보통', color: ColorStatus.Global.Green };
  if (value < 150) return { level: '나쁨', color: ColorStatus.Global.Orange };
  return { level: '매우 나쁨', color: ColorStatus.Global.Red };
};

export const getUltrafineDustLevelAndColor = (value: number) => {
  if (value < 15) return { level: '좋음', color: ColorPrimary.B400 };
  if (value < 35) return { level: '보통', color: ColorStatus.Global.Green };
  if (value < 75) return { level: '나쁨', color: ColorStatus.Global.Orange };
  return { level: '매우 나쁨', color: ColorStatus.Global.Red };
};

export const createCircularProgressPath = (
  value: number,
  maxValue: number,
  radius: number = 46
): string => {
  if (value <= 0) return '';

  const normalizedValue = Math.min(value, maxValue);

  const percentage = normalizedValue / maxValue;

  const angle = percentage * 2 * Math.PI;
  const startAngle = Math.PI / 2;
  const endAngle = startAngle + angle;

  // 중심점
  const centerX = 50;
  const centerY = 50;

  // 시작점과 끝점 계산
  const startX = centerX + radius * Math.cos(startAngle);
  const startY = centerY + radius * Math.sin(startAngle);
  const endX = centerX + radius * Math.cos(endAngle);
  const endY = centerY + radius * Math.sin(endAngle);

  // 큰 호인지 판단 (180도 이상인지)
  const largeArcFlag = angle > Math.PI ? 1 : 0;

  // 완전한 원인 경우 (100%)
  if (percentage >= 0.999) {
    return `M ${centerX} ${centerY + radius}
              A ${radius} ${radius} 0 1 1 ${centerX - 0.1} ${centerY + radius}`;
  }

  // 부분적인 호 (stroke로 그릴 때는 시작점에서 끝점까지의 호만)
  return `M ${startX} ${startY}
            A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`;
};
