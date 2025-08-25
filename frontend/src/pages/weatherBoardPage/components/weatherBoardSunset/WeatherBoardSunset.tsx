import { ColorPrimary, GrayScale } from '@/styles/colors';
import S from './WeatherBoardSunset.style';
import { SunEffect } from '@/assets/icons/flat';
import { useSunsetAnimation } from '@/pages/weatherBoardPage/hooks/useSunsetAnimation';
import type { GetSunRiseSetTimeResponse } from '@/types/openapiGenerator';
import { Suspense } from 'react';
import { getWeatherSunset } from '@/apis/weather.api';
import { CircularSpinner } from '@/components/common/CircularSpinner';
import WeatherErrorBoundary from '@/components/common/WeatherErrorBoundary';
import { useWeatherQuery } from '@/pages/homePage/hooks/useWeatherQuery';

const WeatherBoardSunset = () => {
  const SunsetContent = () => {
    const { data: sunsetData } = useWeatherQuery(
      ['weather', 'sunset'],
      async (): Promise<GetSunRiseSetTimeResponse> => {
        const res = await getWeatherSunset();
        return res.data;
      }
    );

    const {
      progress,
      sunX,
      sunY,
      shouldShowSun,
      semicirclePath,
      sectorPath,
      clipId,
      viewBox,
      semicircleStrokePath,
    } = useSunsetAnimation({
      startTime: sunsetData.startTime || '00:00',
      endTime: sunsetData.endTime || '00:00',
    });

    return (
      <div css={S.WeatherBoardSunsetContentWrapper}>
        <div css={S.WeatherBoardSunsetContent}>
          <div css={S.WeatherBoardSunsetBaseLine} />
          <svg viewBox={viewBox} css={S.WeatherBoardSunsetSvg}>
            <defs>
              <clipPath id={clipId}>
                <path d={semicirclePath} />
              </clipPath>
            </defs>
            {/* 채워진 부채꼴 */}
            {progress > 0 && (
              <g clipPath={`url(#${clipId})`}>
                <path
                  d={sectorPath}
                  fill={
                    shouldShowSun
                      ? 'rgba(95, 95, 70, 0.30)'
                      : 'rgba(89, 96, 114, 0.2)'
                  }
                />
              </g>
            )}
            {/* 점선 반원 경계 */}
            <path
              d={semicircleStrokePath}
              fill="none"
              stroke={GrayScale.G800}
              strokeWidth="2"
              strokeDasharray="8 8"
              opacity="0.5"
            />
            {/* 태양 아이콘 */}
            {shouldShowSun && (
              <g transform={`translate(${sunX}, ${sunY})`}>
                <foreignObject x="-16" y="-16" width="32" height="32">
                  <div css={S.WeatherBoardSunsetSvgWrapper}>
                    <SunEffect width={32} height={32} />
                  </div>
                </foreignObject>
              </g>
            )}
          </svg>
        </div>
        <div css={S.WeatherBoardSunsetTimeWrapper}>
          <span css={S.WeatherBoardSunsetTime}>{sunsetData.startTime}</span>
          <span css={S.WeatherBoardSunsetTime}>{sunsetData.endTime}</span>
        </div>
      </div>
    );
  };

  return (
    <div css={S.WeatherBoardSunset}>
      <WeatherErrorBoundary title="일출/일몰">
        <Suspense
          fallback={
            <CircularSpinner minHeight={180} color={ColorPrimary.B700} />
          }
        >
          <h3 css={S.WeatherBoardSunsetTitle}>일출/일몰</h3>
          <SunsetContent />
        </Suspense>
      </WeatherErrorBoundary>
    </div>
  );
};

export default WeatherBoardSunset;
