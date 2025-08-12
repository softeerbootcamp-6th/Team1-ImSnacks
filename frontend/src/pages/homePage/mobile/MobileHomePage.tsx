import { WEATHER_CONDITIONS, WEATHER_METRICS } from '@/types/weather.types';
import MobileHeader from '../components/mobileHeader/MobileHeader';
import S from './MobileHomePage.style';
import MobileHeadline from '../components/mobileHeadline/MobileHeadline';
import MobileCurrentWeather from '../components/mobileCurrentWeather/MobileCurrentWeather';
import MobileTodo from '../components/mobileTodo/MobileTodo';

const MobileHomePage = () => {
  const todoList = [
    {
      id: 1,
      cropName: '감귤',
      workName: '수확하기',
      workTime: '09:00 - 10:30',
      status: 'INCOMPLETED',
    },
    {
      id: 2,
      cropName: '복숭아',
      workName: '물주기',
      workTime: '11:00 - 12:00',
      status: 'INCOMPLETED',
    },
    {
      id: 3,
      cropName: '포도',
      workName: '비료주기',
      workTime: '13:00 - 14:00',
      status: 'COMPLETED',
    },
  ];
  return (
    <div css={S.MobileHomePage}>
      <MobileHeader
        weatherCondition={WEATHER_CONDITIONS.CLOUDY}
        weatherKeyword="구름 많음"
        temperature={25}
      />
      <div css={S.MobileHomeContentWrapper}>
        <MobileHeadline />
        <MobileCurrentWeather
          weatherData={[
            {
              metric: '강수량',
              metricType: WEATHER_METRICS.PRECIPITATION,
              value: 25,
            },
            { metric: '습도', metricType: WEATHER_METRICS.HUMIDITY, value: 60 },
            {
              metric: '온도',
              metricType: WEATHER_METRICS.TEMPERATURE,
              value: 25,
            },
            {
              metric: '바람',
              metricType: WEATHER_METRICS.WIND_SPEED,
              value: 10,
            },
          ]}
        />
        <MobileTodo todoList={todoList} />
      </div>
    </div>
  );
};

export default MobileHomePage;
