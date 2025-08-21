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
import { useUserStore } from './store/useUserStore';
import { useLocation } from 'react-router';
import { ThemeProvider } from '@emotion/react';
import { createThemeAssets } from './styles/createThemeAssets';
import { weatherToTheme } from './utils/weatherToTheme';

function App() {
  const { weatherCondition, setWeatherCondition } = useWeatherConditionStore();
  const { setNickName } = useUserStore();
  const { currentTime, setCurrentTime } = useTimeStore();
  const location = useLocation();

  const weatherTheme = createThemeAssets(weatherToTheme[weatherCondition]);

  // 초기 렌더링 시
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
  }, [
    currentTime,
    setCurrentTime,
    setWeatherCondition,
    setNickName,
    location.pathname,
  ]);

  return (
    <ThemeProvider theme={weatherTheme}>
      <GlobalStyles />
      <Router />
    </ThemeProvider>
  );
}

export default App;
