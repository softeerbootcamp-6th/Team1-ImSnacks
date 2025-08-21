import {
  WEATHER_CONDITIONS,
  type WeatherConditionsType,
} from '@/types/weather.types';
import MobileHeader from '../components/mobileHeader/MobileHeader';
import S from './MobileHomePage.style';
import MobileHeadline from '../components/mobileHeadline/MobileHeadline';
import MobileCurrentWeather from '../components/mobileCurrentWeather/MobileCurrentWeather';
import MobileTodo from '../components/mobileTodo/MobileTodo';
import { useEffect, useState } from 'react';
import { getWeatherNow } from '@/apis/weather.api';
import type { GetWeatherConditionResponse } from '@/types/openapiGenerator';

const MobileHomePage = () => {
  const [weatherSummary, setWeatherSummary] =
    useState<GetWeatherConditionResponse>();

  const fetchWeather = async () => {
    try {
      const res = await getWeatherNow();
      if (res.data) {
        setWeatherSummary(res.data);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div css={S.MobileHomePage}>
      <MobileHeader
        weatherCondition={
          (weatherSummary?.weatherCondition as WeatherConditionsType) ??
          WEATHER_CONDITIONS.SUNNY
        }
        weatherKeyword={weatherSummary?.weatherKeyword ?? '맑음'}
        temperature={weatherSummary?.temperature ?? 25}
      />
      <div css={S.MobileHomeContentWrapper}>
        <MobileHeadline />
        <MobileCurrentWeather />
        <MobileTodo />
      </div>
    </div>
  );
};

export default MobileHomePage;
