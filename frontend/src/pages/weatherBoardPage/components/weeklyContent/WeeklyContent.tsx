import { FLAT_ICON } from '@/constants/flatIcons';
import type { WeatherConditions } from '@/types/weather.types';
import S from './WeeklyContent.style';

interface WeeklyContentProps {
  title: string;
  weather: WeatherConditions;
  highestTemperature: number;
  lowestTemperature: number;
}

const WeeklyContent = ({
  title,
  weather,
  highestTemperature,
  lowestTemperature,
}: WeeklyContentProps) => {
  const FlatIconComponent = FLAT_ICON[weather as keyof typeof FLAT_ICON];

  return (
    <div css={S.WeeklyContent}>
      <div css={S.WeeklyTitle}>{title}</div>
      <div css={S.WeeklyWeatherIconWrapper}>
        <FlatIconComponent width={32} height={32} />
      </div>
      <div css={S.WeeklyTemperature}>
        {highestTemperature}° / {lowestTemperature}°
      </div>
    </div>
  );
};

export default WeeklyContent;
