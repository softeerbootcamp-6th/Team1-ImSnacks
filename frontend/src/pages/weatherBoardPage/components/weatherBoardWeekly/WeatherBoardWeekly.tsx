import S from './WeatherBoardWeekly.style';
import WeeklyContent from '../weeklyContent/WeeklyContent';
import { WEATHER_CONDITIONS } from '@/types/weather.types';

const weeklyWeatherData = [
  {
    title: '오늘',
    weather: WEATHER_CONDITIONS.RAIN,
    highestTemperature: 30,
    lowestTemperature: 20,
  },
  {
    title: '내일',
    weather: WEATHER_CONDITIONS.CLOUDY,
    highestTemperature: 28,
    lowestTemperature: 18,
  },
  {
    title: '수요일',
    weather: WEATHER_CONDITIONS.RAIN,
    highestTemperature: 25,
    lowestTemperature: 15,
  },
  {
    title: '목요일',
    weather: WEATHER_CONDITIONS.SNOW,
    highestTemperature: 22,
    lowestTemperature: 10,
  },
  {
    title: '금요일',
    weather: WEATHER_CONDITIONS.SUNNY,
    highestTemperature: 26,
    lowestTemperature: 16,
  },
  {
    title: '토요일',
    weather: WEATHER_CONDITIONS.CLOUDY,
    highestTemperature: 24,
    lowestTemperature: 14,
  },
  {
    title: '일요일',
    weather: WEATHER_CONDITIONS.LESS_CLOUDY,
    highestTemperature: 27,
    lowestTemperature: 17,
  },
];

const WeatherBoardWeekly = () => {
  return (
    <div css={S.WeatherBoardWeekly}>
      <div css={S.WeeklyTitleWrapper}>
        <h3 css={S.WeeklyTitle}>7일 간의 날씨 예보</h3>
      </div>
      <div css={S.WeeklyContentContainer}>
        {weeklyWeatherData.map((data, index) => (
          <WeeklyContent
            key={index}
            title={data.title}
            weather={data.weather}
            highestTemperature={data.highestTemperature}
            lowestTemperature={data.lowestTemperature}
          />
        ))}
      </div>
    </div>
  );
};

export default WeatherBoardWeekly;
