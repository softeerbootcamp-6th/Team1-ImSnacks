import type { GetDailyMaxPrecipitationResponse } from '@/types/openapiGenerator';
import { usePrecipitationSvg } from '../../hooks/usePrecipitationSvg';
import S from './WeatherBoardPrecipitation.style';
import { Suspense } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getWeatherPrecipitation } from '@/apis/weather.api';
import { CircularSpinner } from '@/components/common/CircularSpinner';

const WeatherBoardPrecipitation = () => {
  const Content = () => {
    const { data: maxPrecipitation } = useSuspenseQuery({
      queryKey: ['weather', 'precipitation'],
      queryFn: async (): Promise<GetDailyMaxPrecipitationResponse> => {
        const res = await getWeatherPrecipitation();
        return res.data;
      },

      staleTime: 24 * 60 * 60 * 1000,
    });

    const { svgElement } = usePrecipitationSvg({
      value: maxPrecipitation?.value ?? 0,
    });

    return (
      <>
        <div css={S.WeatherBoardPrecipitationTitle}>
          <h3>최고 강수량</h3>
          <p>
            {maxPrecipitation?.value}mm{' '}
            {(maxPrecipitation?.value ?? 0) >= 30 && '이상'}
          </p>
        </div>

        {svgElement && (
          <div
            style={{
              marginTop: 'auto',
              width: '100%',
            }}
            css={S.WeatherBoardPrecipitationSvg}
          >
            {svgElement}
          </div>
        )}
      </>
    );
  };

  return (
    <div css={S.WeatherBoardPrecipitation}>
      <Suspense fallback={<CircularSpinner minHeight={200} />}>
        <Content />
      </Suspense>
    </div>
  );
};

export default WeatherBoardPrecipitation;
