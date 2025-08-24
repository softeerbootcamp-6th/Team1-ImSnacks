import type { GetDailyMaxPrecipitationResponse } from '@/types/openapiGenerator';
import { usePrecipitationSvg } from '../../hooks/usePrecipitationSvg';
import S from './WeatherBoardPrecipitation.style';
import { Suspense } from 'react';
import { getWeatherPrecipitation } from '@/apis/weather.api';
import { CircularSpinner } from '@/components/common/CircularSpinner';
import WeatherErrorBoundary from '@/components/common/WeatherErrorBoundary';
import { useWeatherQuery } from '@/pages/homePage/hooks/useWeatherQuery';

const PrecipitationContent = () => {
  const { data: maxPrecipitation } = useWeatherQuery(
    ['weather', 'precipitation'],
    async (): Promise<GetDailyMaxPrecipitationResponse> => {
      const res = await getWeatherPrecipitation();
      return res.data;
    }
  );

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
        <div css={S.WeatherBoardPrecipitationSvg}>{svgElement}</div>
      )}
    </>
  );
};

const WeatherBoardPrecipitation = () => {
  return (
    <div css={S.WeatherBoardPrecipitation}>
      <WeatherErrorBoundary title="습도">
        <Suspense fallback={<CircularSpinner minHeight={200} />}>
          <PrecipitationContent />
        </Suspense>
      </WeatherErrorBoundary>
    </div>
  );
};

export default WeatherBoardPrecipitation;
