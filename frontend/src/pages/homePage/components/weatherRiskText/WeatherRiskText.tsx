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

  const startIndex = graphData.valuePerTime.findIndex(
    item => item.name === startTime
  );
  const endIndex = endTime
    ? graphData.valuePerTime.findIndex(item => item.name === endTime)
    : startIndex;

  if (startIndex === -1 || endIndex === -1) return null;

  // 중간 위치
  const centerIndex = (startIndex + endIndex) / 2;

  const centerX = 12 + centerIndex * pointSpacing;

  return (
    <div key={`category_${index}`} css={S.WeatherRiskText(centerX, category)}>
      {category}
    </div>
  );
};

export default WeatherRiskText;
