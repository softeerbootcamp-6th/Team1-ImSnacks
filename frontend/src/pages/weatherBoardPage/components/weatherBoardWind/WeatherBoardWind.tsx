import S from './WeatherBoardWind.style';
import { Typography } from '@/styles/typography';
import { WindArrow } from '@/assets/icons/flat';
import { GrayScale } from '@/styles/colors';
import type { GetWindInfoResponse } from '@/types/openapiGenerator';
import { Suspense, useState, useEffect } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getWeatherWind } from '@/apis/weather.api';
import { CircularSpinner } from '@/components/common/CircularSpinner';
import WeatherErrorBoundary from '@/components/common/WeatherErrorBoundary';

const WeatherBoardWind = () => {
  const WindContent = () => {
    const { data: windData } = useSuspenseQuery({
      queryKey: ['weather', 'wind'],
      queryFn: async (): Promise<GetWindInfoResponse> => {
        const res = await getWeatherWind();
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

    const [isAnimating, setIsAnimating] = useState(false);
    useEffect(() => {
      setTimeout(() => setIsAnimating(true), 100);
    }, []);

    return (
      <div css={S.WeatherBoardWindContentWrapper}>
        <span css={Typography.Body_S_400}>N</span>
        <div css={S.WeatherBoardWindContent}>
          <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
            <circle
              cx="26"
              cy="26"
              r="25"
              stroke={GrayScale.G800}
              strokeWidth="2"
              opacity="0.5"
              fill="none"
            />
          </svg>
          <WindArrow
            width="48"
            height="54"
            css={
              isAnimating
                ? S.WindArrow(windData.degree ?? 0)
                : S.WindArrowInitial
            }
          />
        </div>
        <h3>최고 풍속</h3>
        <p>
          {windData.direction} • {windData.speed}m/s
        </p>
      </div>
    );
  };

  return (
    <div css={S.WeatherBoardWind}>
      <WeatherErrorBoundary title="풍속">
        <Suspense fallback={<CircularSpinner minHeight={180} />}>
          <WindContent />
        </Suspense>
      </WeatherErrorBoundary>
    </div>
  );
};

export default WeatherBoardWind;
