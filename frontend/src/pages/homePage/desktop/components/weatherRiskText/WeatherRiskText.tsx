import S from './WeatherRiskText.style';

interface WeatherRiskTextProps {
  category: string;
  index: number;
  startX: number;
  endX: number;
}

const WeatherRiskText = ({
  category,
  index,
  startX,
  endX,
}: WeatherRiskTextProps) => {
  return (
    <div
      key={`${category}_${index}`}
      css={S.WeatherRiskText((startX + endX) / 2)}
    >
      {category}
    </div>
  );
};

export default WeatherRiskText;
