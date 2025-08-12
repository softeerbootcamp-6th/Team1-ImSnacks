import type { WeatherMetrics } from '@/types/weather.types';
import S from './MobileCurrentWeather.style';
import { Typography } from '@/styles/typography';
import MobileCurrentWeatherContent from '../mobileCurrentWeatherContent/MobileCurrentWeatherContent';

interface MobileCurrentWeatherProps {
  metric: string;
  metricType: WeatherMetrics;
  value: number;
}

interface MobileCurrentWeatherComponentProps {
  weatherData: MobileCurrentWeatherProps[];
}

const MobileCurrentWeather = ({
  weatherData,
}: MobileCurrentWeatherComponentProps) => {
  return (
    <div css={S.MobileCurrentWeather}>
      <h2 css={Typography.Mobile_Headline}>현 시각 기상 상황</h2>
      <div css={S.MobileCurrentWeatherContentWrapper}>
        <div css={S.MobileCurrentWeatherContentRow}>
          {weatherData.slice(0, 2).map((item: MobileCurrentWeatherProps) => (
            <MobileCurrentWeatherContent key={item.metricType} data={item} />
          ))}
        </div>
        <div css={S.MobileCurrentWeatherContentRow}>
          {weatherData.slice(2).map((item: MobileCurrentWeatherProps) => (
            <MobileCurrentWeatherContent key={item.metricType} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileCurrentWeather;
