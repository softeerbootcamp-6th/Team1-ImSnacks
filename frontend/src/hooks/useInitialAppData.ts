import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { getWeatherNow } from '@/apis/weather.api';
import {
  WEATHER_CONDITIONS,
  type WeatherConditionsType,
} from '@/types/weather.types';
import { useWeatherConditionStore } from '@/store/useWeatherConditionStore';
import { useUserStore } from '@/store/useUserStore';
import { useTimeStore } from '@/store/useTimeStore';
import { useIsMobileStore } from '@/store/useIsMobileStore';

export const useInitialAppData = () => {
  const location = useLocation();
  const { setWeatherCondition } = useWeatherConditionStore();
  const { setNickName } = useUserStore();
  const { currentTime, setCurrentTime } = useTimeStore();
  const { setIsMobile } = useIsMobileStore();

  useEffect(() => {
    if (location.pathname === '/login') return;

    const fetchWeather = async () => {
      try {
        const res = await getWeatherNow();

        if (res.data) {
          const weatherConditionFromApi = res.data.weatherCondition;

          // weatherCondition이 유효한 값인지 확인
          if (
            weatherConditionFromApi &&
            Object.values(WEATHER_CONDITIONS).includes(
              weatherConditionFromApi as WeatherConditionsType
            )
          ) {
            setWeatherCondition(
              weatherConditionFromApi as WeatherConditionsType
            );
            setNickName(res.data.memberName || '');
          }
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
    setCurrentTime(currentTime);

    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    setIsMobile(isMobile);
  }, [
    currentTime,
    setCurrentTime,
    setWeatherCondition,
    setNickName,
    setIsMobile,
    location.pathname,
  ]);
};
