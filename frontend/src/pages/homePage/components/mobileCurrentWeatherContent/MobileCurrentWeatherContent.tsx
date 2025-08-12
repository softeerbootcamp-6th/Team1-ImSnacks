import type { WeatherMetrics } from '@/types/weather.types';
import S from './MobileCurrentWeatherContent.style';
import { FLAT_ICON } from '@/constants/flatIcons';

interface MobileCurrentWeatherContentProps {
  data: {
    metric: string;
    metricType: WeatherMetrics;
    value: number;
  };
}

const MobileCurrentWeatherContent = ({
  data: { metric, metricType, value },
}: MobileCurrentWeatherContentProps) => {
  const FlatIconComponent = FLAT_ICON[metricType as keyof typeof FLAT_ICON];

  return (
    <div css={S.MobileCurrentWeatherContent}>
      <div>
        <h3>{metric}</h3>
        <p>{value}</p>
      </div>

      <FlatIconComponent
        width={32}
        height={32}
        css={S.MobileCurrentWeatherIcon}
      />
    </div>
  );
};

export default MobileCurrentWeatherContent;
