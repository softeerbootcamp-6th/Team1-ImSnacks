import type { GetDailyMaxPrecipitationResponse } from '@/types/openapiGenerator';
import { usePrecipitationSvg } from '../../hooks/usePrecipitationSvg';
import S from './WeatherBoardPrecipitation.style';
import { Suspense, useState } from 'react';
import { getWeatherPrecipitation } from '@/apis/weather.api';
import { CircularSpinner } from '@/components/common/CircularSpinner';
import WeatherErrorBoundary from '@/pages/weatherBoardPage/components/weatherErrorBoundary/WeatherErrorBoundary';
import { useWeatherQuery } from '@/pages/weatherBoardPage/hooks/useWeatherQuery';
import { ColorPrimary } from '@/styles/colors';

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

  const [isHovered, setIsHovered] = useState(false);

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
          css={S.WeatherBoardPrecipitationSvg}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div css={[S.WaveShake, isHovered && S.WaveShakeActive]}>
            {svgElement}
          </div>
        </div>
      )}
    </>
  );
};

const WeatherBoardPrecipitation = () => {
  return (
    <div css={S.WeatherBoardPrecipitation}>
      <WeatherErrorBoundary title="습도">
        <Suspense
          fallback={
            <CircularSpinner minHeight={200} color={ColorPrimary.B700} />
          }
        >
          <PrecipitationContent />
        </Suspense>
      </WeatherErrorBoundary>
    </div>
  );
};

export default WeatherBoardPrecipitation;
