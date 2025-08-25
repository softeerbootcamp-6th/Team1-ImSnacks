import S from './WeatherBoardWeekly.style';
import WeeklyContent from '../weeklyContent/WeeklyContent';
import { Suspense } from 'react';
import type { GetSevenDaysForecastResponse } from '@/types/openapiGenerator';
import { getWeatherSevenDays } from '@/apis/weather.api';
import { CircularSpinner } from '@/components/common/CircularSpinner';
import WeatherErrorBoundary from '@/pages/weatherBoardPage/components/weatherErrorBoundary/WeatherErrorBoundary';
import { useWeatherQuery } from '@/pages/homePage/hooks/useWeatherQuery';
import { ColorPrimary } from '@/styles/colors';

const WeatherBoardWeekly = () => {
  const SevenDaysContent = () => {
    const { data: weeklyWeatherData } = useWeatherQuery(
      ['weather', 'weekly'],
      async (): Promise<GetSevenDaysForecastResponse[]> => {
        const res = await getWeatherSevenDays();
        return res.data;
      }
    );

    return (
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
    );
  };

  return (
    <div css={S.WeatherBoardWeekly}>
      <WeatherErrorBoundary title="7일 간의 날씨 예보">
        <Suspense
          fallback={
            <CircularSpinner minHeight={200} color={ColorPrimary.B700} />
          }
        >
          <div css={S.WeeklyTitleWrapper}>
            <h3 css={S.WeeklyTitle}>7일 간의 날씨 예보</h3>
          </div>
          <SevenDaysContent />
        </Suspense>
      </WeatherErrorBoundary>
    </div>
  );
};

export default WeatherBoardWeekly;
