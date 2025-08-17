import S from './WeatherBoardWeekly.style';
import WeeklyContent from '../weeklyContent/WeeklyContent';
import { useEffect, useState } from 'react';
import type { GetSevenDaysForecastResponse } from '@/types/openapiGenerator';
import { getWeatherSevenDays } from '@/apis/weather.api';

const WeatherBoardWeekly = () => {
  const [weeklyWeatherData, setWeeklyWeatherData] =
    useState<GetSevenDaysForecastResponse[]>();

  const fetchWeeklyWeatherData = async () => {
    try {
      const res = await getWeatherSevenDays();
      if (res.data) {
        setWeeklyWeatherData(res.data);
      }
    } catch (error) {
      console.error('Error fetching weekly weather data:', error);
    }
  };

  useEffect(() => {
    fetchWeeklyWeatherData();
  }, []);

  return (
    <div css={S.WeatherBoardWeekly}>
      <div css={S.WeeklyTitleWrapper}>
        <h3 css={S.WeeklyTitle}>7일 간의 날씨 예보</h3>
      </div>
      <div css={S.WeeklyContentContainer}>
        {weeklyWeatherData?.map((data: GetSevenDaysForecastResponse, index) => (
          <WeeklyContent
            key={index}
            dayOfWeek={data.dayOfWeek}
            weatherCondition={data.weatherCondition}
            minTemperature={data.minTemperature}
            maxTemperature={data.maxTemperature}
          />
        ))}
      </div>
    </div>
  );
};

export default WeatherBoardWeekly;
