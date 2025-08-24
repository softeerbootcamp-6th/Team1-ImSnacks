import S from './WeatherBoardWeekly.style';
import WeeklyContent from '../weeklyContent/WeeklyContent';
import { Suspense } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import type { GetSevenDaysForecastResponse } from '@/types/openapiGenerator';
import { getWeatherSevenDays } from '@/apis/weather.api';
import { CircularSpinner } from '@/components/common/CircularSpinner';
import WeatherErrorBoundary from '@/components/common/WeatherErrorBoundary';

const WeatherBoardWeekly = () => {
  const SevenDaysContent = () => {
    const { data: weeklyWeatherData } = useSuspenseQuery({
      queryKey: ['weather', 'weekly'],
      queryFn: async (): Promise<GetSevenDaysForecastResponse[]> => {
        const res = await getWeatherSevenDays();
        return res.data;
      },
      staleTime: 24 * 60 * 60 * 1000,
      retry: failureCount => {
        return failureCount < 2;
      },
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      gcTime: 1000,
    });

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
        <Suspense fallback={<CircularSpinner minHeight={200} />}>
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
