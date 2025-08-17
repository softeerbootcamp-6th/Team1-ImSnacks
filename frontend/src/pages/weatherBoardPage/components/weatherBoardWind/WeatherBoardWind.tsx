import S from './WeatherBoardWind.style';
import { Typography } from '@/styles/typography';
import { WindArrow } from '@/assets/icons/flat';
import { GrayScale } from '@/styles/colors';
import { GetWindInfoResponse } from '@/types/openapiGenerator';
import { useEffect, useState } from 'react';
import { getWeatherWind } from '@/apis/weather.api';

const WeatherBoardWind = () => {
  const [windData, setWindData] = useState<GetWindInfoResponse>();
  const [isAnimating, setIsAnimating] = useState(false);

  const fetchWindData = async () => {
    try {
      const res = await getWeatherWind();
      if (res.data) {
        setWindData(res.data);
        // 데이터가 로드된 후 애니메이션 시작
        setTimeout(() => setIsAnimating(true), 100);
      }
    } catch (error) {
      console.error('Error fetching wind data:', error);
    }
  };

  useEffect(() => {
    fetchWindData();
  }, []);

  return (
    <div css={S.WeatherBoardWind}>
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
              ? S.WindArrow(windData?.degree ?? 0)
              : S.WindArrowInitial
          }
        />
      </div>
      <h3>최고 풍속</h3>
      <p>
        {windData?.direction} • {windData?.speed}m/s
      </p>
    </div>
  );
};

export default WeatherBoardWind;
