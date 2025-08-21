import { Router } from './routes/Router';
import GlobalStyles from './styles/GlobalStyles';
import { useWeatherConditionStore } from './store/useWeatherConditionStore';
import { useTimeStore } from './store/useTimeStore';
import { useUserStore } from './store/useUserStore';
import { useLocation } from 'react-router';
import { useIsMobileStore } from './store/useIsMobileStore';
import { ThemeProvider } from '@emotion/react';
import { createThemeAssets } from './styles/createThemeAssets';
import { weatherToTheme } from './utils/weatherToTheme';
import { useInitialAppData } from './hooks/useInitialAppData';

function App() {
  const { setWeatherCondition } = useWeatherConditionStore();
  const { setNickName } = useUserStore();
  const { currentTime, setCurrentTime } = useTimeStore();
  const { setIsMobile } = useIsMobileStore();
  const location = useLocation();

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
  const { weatherCondition } = useWeatherConditionStore();
  const weatherTheme = createThemeAssets(weatherToTheme[weatherCondition]);
  useInitialAppData();

  return (
    <ThemeProvider theme={weatherTheme}>
      <GlobalStyles />
      <Router />
    </ThemeProvider>
  );
}

export default App;
