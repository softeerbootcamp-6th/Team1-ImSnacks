import S from './WeatherRiskText.style';
import type {
  GetWeatherGraphResponse,
  WeatherRiskDto,
} from '@/types/openapiGenerator';

interface WeatherRiskTextProps {
  riskData: WeatherRiskDto;
  graphData: GetWeatherGraphResponse;
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

  if (!graphData?.valuePerTime || graphData.valuePerTime.length === 0) {
    return null;
  }

  const getCenterX = (startTime: string, endTime?: string) => {
    if (!graphData.valuePerTime) {
      return 0;
    }

    const startIndex = graphData.valuePerTime.findIndex(
      item => item.name === startTime
    );
    const endIndex = endTime
      ? graphData.valuePerTime.findIndex(item => item.name === endTime)
      : startIndex;

    // startIndex가 -1인 경우 (찾을 수 없는 경우) 처리
    if (startIndex === -1) {
      return 0;
    }

    // 중간 위치
    const centerIndex = (startIndex + endIndex) / 2;

    const centerX = 12 + centerIndex * pointSpacing;

    return centerX;
  };

  return (
    <div
      key={`category_${index}`}
      css={S.WeatherRiskText(
        getCenterX(startTime ?? '', endTime ?? ''),
        category ?? ''
      )}
    >
      {category}
    </div>
  );
};

export default WeatherRiskText;
