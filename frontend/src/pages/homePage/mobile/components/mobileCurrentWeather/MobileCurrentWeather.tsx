import S from './MobileCurrentWeather.style';
import { Typography } from '@/styles/typography';
import MobileCurrentWeatherContent from '../mobileCurrentWeatherContent/MobileCurrentWeatherContent';
import { getWeatherStatus } from '@/apis/weather.api';
import { useEffect, useState } from 'react';
import type { GetWeatherStatusResponse } from '@/types/openapiGenerator';

const MobileCurrentWeather = () => {
  const [weatherData, setWeatherData] = useState<GetWeatherStatusResponse[]>();
  const fetchWeatherData = async () => {
    try {
      const res = await getWeatherStatus();
      if (res.data) {
        setWeatherData(res.data);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  return (
    <div css={S.MobileCurrentWeather}>
      <h2 css={Typography.Mobile_Headline}>현 시각 기상 상황</h2>
      <div css={S.MobileCurrentWeatherContentWrapper}>
        <div css={S.MobileCurrentWeatherContentRow}>
          {weatherData?.slice(0, 2).map((item: GetWeatherStatusResponse) => (
            <MobileCurrentWeatherContent key={item.metricType} {...item} />
          ))}
        </div>
        <div css={S.MobileCurrentWeatherContentRow}>
          {weatherData?.slice(2).map((item: GetWeatherStatusResponse) => (
            <MobileCurrentWeatherContent key={item.metricType} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileCurrentWeather;
