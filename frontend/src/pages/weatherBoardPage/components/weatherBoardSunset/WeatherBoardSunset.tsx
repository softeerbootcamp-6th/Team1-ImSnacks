import { GrayScale } from '@/styles/colors';
import S from './WeatherBoardSunset.style';
import { SunEffect } from '@/assets/icons/flat';
import { useSunsetAnimation } from '@/pages/weatherBoardPage/hooks/useSunsetAnimation';

const WeatherBoardSunset = ({
  startTime,
  endTime,
}: {
  startTime: string;
  endTime: string;
}) => {
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
  } = useSunsetAnimation({ startTime, endTime });

  return (
    <div css={S.WeatherBoardSunset}>
      <h3 css={S.WeatherBoardSunsetTitle}>일출/일몰</h3>

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
                <SunEffect width={32} height={32} />
              </foreignObject>
            </g>
          )}
        </svg>
      </div>

      <div css={S.WeatherBoardSunsetTimeWrapper}>
        <span css={S.WeatherBoardSunsetTime}>{startTime}</span>
        <span css={S.WeatherBoardSunsetTime}>{endTime}</span>
      </div>
    </div>
  );
};

export default WeatherBoardSunset;
