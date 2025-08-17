import type { GetDailyMaxPrecipitationResponse } from '@/types/openapiGenerator';
import { usePrecipitationSvg } from '../../hooks/usePrecipitationSvg';
import S from './WeatherBoardPrecipitation.style';
import { useEffect, useState } from 'react';
import { getWeatherPrecipitation } from '@/apis/weather.api';

const WeatherBoardPrecipitation = () => {
  const [maxPrecipitation, setMaxPrecipitation] =
    useState<GetDailyMaxPrecipitationResponse>();

  const fetchMaxPrecipitation = async () => {
    try {
      const res = await getWeatherPrecipitation();
      if (res.data) {
        setMaxPrecipitation(res.data);
      }
    } catch (error) {
      console.error('Error fetching max precipitation:', error);
    }
  };

  useEffect(() => {
    fetchMaxPrecipitation();
  }, []);

  const { svgElement } = usePrecipitationSvg({
    value: maxPrecipitation?.value ?? 0,
  });

  return (
    <div css={S.WeatherBoardPrecipitation}>
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
    </div>
  );
};

export default WeatherBoardPrecipitation;
