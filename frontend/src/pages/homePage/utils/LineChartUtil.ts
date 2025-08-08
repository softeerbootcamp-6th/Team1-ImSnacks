import type { MainGraphData, WeatherRiskData } from '@/types/mainGraph.type';

export const generateYTicks = ({ min, max }: { min: number; max: number }) => {
  const ticks = [];
  const step = (max - min) / 5;
  for (let i = 0; i <= 5; i++) {
    ticks.push(Math.round((min + step * i) * 10) / 10);
  }
  return ticks.reverse();
};

export const getProcessedData = (
  graphData: MainGraphData,
  weatherRiskData: WeatherRiskData[]
) => {
  return graphData.valuePerTime.map(item => {
    const result: Record<string, string | number | null> = { ...item };

    weatherRiskData.forEach((riskData, index) => {
      const { startTime, endTime } = riskData;
      const itemTime = Number(item.name);
      const startTimeNum = Number(startTime);
      const endTimeNum = Number(endTime);

      // 시간이 22시를 넘어 다음날 새벽으로 넘어가는 경우 처리
      let isInRange;
      if (startTimeNum > endTimeNum) {
        // 예: 22시 ~ 02시 (다음날)
        isInRange = itemTime >= startTimeNum || itemTime <= endTimeNum;
      } else {
        // 일반적인 경우: 10시 ~ 14시
        isInRange = itemTime >= startTimeNum && itemTime <= endTimeNum;
      }

      result[`areaValue_${index}`] = isInRange ? item.value : null;
    });
    return result;
  });
};
