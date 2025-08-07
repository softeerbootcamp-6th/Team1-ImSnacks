import type { MainGraphData, WeatherRiskData } from '@/types/mainGraph.type';
import S from './WeatherRiskText.style';

interface WeatherRiskTextProps {
  riskData: WeatherRiskData;
  graphData: MainGraphData;
  index: number;
  pointSpacing: number;
}

const WeatherRiskText = ({
  riskData,
  graphData,
  index,
  pointSpacing,
}: WeatherRiskTextProps) => {
  const { category, startTime, endTime } = riskData;

  const getCenterX = (startTime: string, endTime?: string) => {
    const startIndex = graphData.valuePerTime.findIndex(
      item => item.name === startTime
    );
    const endIndex = endTime
      ? graphData.valuePerTime.findIndex(item => item.name === endTime)
      : startIndex;

    // 중간 위치
    const centerIndex = (startIndex + endIndex) / 2;

    const centerX = 12 + centerIndex * pointSpacing;

    return centerX;
  };

  return (
    <div
      key={`category_${index}`}
      css={S.WeatherRiskText(getCenterX(startTime, endTime), category)}
    >
      {category}
    </div>
  );
};

export default WeatherRiskText;
