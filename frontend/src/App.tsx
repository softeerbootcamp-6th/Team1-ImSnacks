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

function App() {
  const { setWeatherCondition } = useWeatherConditionStore();
  const { setNickName } = useUserStore();
  const { currentTime, setCurrentTime } = useTimeStore();

  // 초기 렌더링 시
  // TODO 미소: 로그인 페이지에서는 실행되면 안되어서 위치를 바꾸던가 해야할듯...
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
            setNickName(res.data.memberName || '');
          }
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
    setCurrentTime(currentTime);
  }, [currentTime, setCurrentTime, setWeatherCondition, setNickName]);

  return (
    <>
      <GlobalStyles />
      <Router />
    </>
  );
}

export default App;
