import { useEffect } from 'react';
import { Router } from './routes/Router';
import GlobalStyles from './styles/GlobalStyles';
import { getWeatherNow } from './apis/weather.api';
import {
  WEATHER_CONDITIONS,
  type WeatherConditionsType,
} from './types/weather.types';
import { useWeatherConditionStore } from './store/useWeatherConditionStore';
import { useTimeStore } from './store/useTimeStore';

function App() {
  const { setWeatherCondition } = useWeatherConditionStore();
  const { currentTime, setCurrentTime } = useTimeStore();

  // 초기 렌더링 시
  useEffect(() => {
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
          }
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
    setCurrentTime(currentTime);
  }, [currentTime, setCurrentTime, setWeatherCondition]);

  return (
    <>
      <GlobalStyles />
      <Router />
    </>
  );
}

export default App;
