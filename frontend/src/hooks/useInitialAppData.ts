import { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router';
import { getWeatherNow } from '@/apis/weather.api';
import {
  WEATHER_CONDITIONS,
  type WeatherConditionsType,
} from '@/types/weather.types';
import { useWeatherConditionStore } from '@/store/useWeatherConditionStore';
import { useUserStore } from '@/store/useUserStore';
import { useTimeStore } from '@/store/useTimeStore';

export const useInitialAppData = () => {
  const location = useLocation();
  const { setWeatherCondition } = useWeatherConditionStore();
  const { setNickName } = useUserStore();
  const { currentTime, increaseTime } = useTimeStore();

  const fetchWeather = useCallback(async () => {
    try {
      const res = await getWeatherNow();
      if (res.data) {
        const weatherConditionFromApi = res.data.weatherCondition;
        if (
          weatherConditionFromApi &&
          Object.values(WEATHER_CONDITIONS).includes(
            weatherConditionFromApi as WeatherConditionsType
          )
        ) {
          setWeatherCondition(weatherConditionFromApi as WeatherConditionsType);
          setNickName(res.data.memberName || '');
        }
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }, [setWeatherCondition, setNickName]);

  // 최초 렌더링 시
  useEffect(() => {
    if (location.pathname === '/login') return;

    fetchWeather();
  }, [setWeatherCondition, setNickName, location.pathname, fetchWeather]);

  // currentTime이 정각이 될 때마다 실행
  useEffect(() => {
    if (currentTime.minute() === 0) {
      fetchWeather();
    }
  }, [currentTime, fetchWeather]);

  useEffect(() => {
    const now = new Date();
    const msToNextMinute =
      (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    // 첫 increaseTime: 다음 분이 되는 순간에 실행
    const timeout = setTimeout(() => {
      increaseTime();

      // 이후에는 1분마다 실행
      const interval = setInterval(() => {
        increaseTime();
      }, 60000);

      // 언마운트 시 interval 정리
      return () => clearInterval(interval);
    }, msToNextMinute);

    // 언마운트 시 timeout 정리
    return () => clearTimeout(timeout);
  }, [increaseTime]);
};
