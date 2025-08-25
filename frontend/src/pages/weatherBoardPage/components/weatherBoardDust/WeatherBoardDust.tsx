import { ColorPrimary, GrayScale } from '@/styles/colors';
import {
  getFineDustLevelAndColor,
  getUltraDustLevelAndColor,
  createCircularProgressPath,
} from '../../utils/dustUtil';
import { useDustAnimation } from '../../hooks/useDustAnimation';
import S from './WeatherBoardDust.style';
import type { GetAirQualityResponse } from '@/types/openapiGenerator';
import { Suspense } from 'react';
import { getWeatherAirQuality } from '@/apis/weather.api';
import { CircularSpinner } from '@/components/common/CircularSpinner';
import WeatherErrorBoundary from '@/components/common/WeatherErrorBoundary';
import { useWeatherQuery } from '@/pages/homePage/hooks/useWeatherQuery';

const WeatherBoardDust = () => {
  const DustContent = () => {
    const { data: airQualityData } = useWeatherQuery(
      ['weather', 'dust'],
      async (): Promise<GetAirQualityResponse> => {
        const res = await getWeatherAirQuality();
        return res.data;
      }
    );

    const { level: pmValueLevel, color: pmValueColor } =
      getFineDustLevelAndColor(airQualityData.pm10Value || 0);
    const { level: pm25ValueLevel, color: pm25ValueColor } =
      getUltraDustLevelAndColor(airQualityData.pm25Value || 0);
    // path 생성
    const pmValuePath = createCircularProgressPath(
      airQualityData.pm10Value || 0,
      180
    );
    const pm25ValuePath = createCircularProgressPath(
      airQualityData.pm25Value || 0,
      100
    );
    // 애니메이션 훅 사용
    const pmValueAnimation = useDustAnimation(
      airQualityData.pm10Value || 0,
      180
    );
    const pm25ValueAnimation = useDustAnimation(
      airQualityData.pm25Value || 0,
      100
    );

    return (
      <>
        <div css={S.DustSection}>
          <h3>미세먼지(PM10)</h3>
          <p>{pmValueLevel}</p>
          <div css={S.DustChartRow}>
            <div css={S.DustChartWrapper}>
              <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                <path
                  d="M100 50C100 77.6142 77.6142 100 50 100C22.3858 100 0 77.6142 0 50C0 22.3858 22.3858 0 50 0C77.6142 0 100 22.3858 100 50ZM7.5 50C7.5 73.4721 26.5279 92.5 50 92.5C73.4721 92.5 92.5 73.4721 92.5 50C92.5 26.5279 73.4721 7.5 50 7.5C26.5279 7.5 7.5 26.5279 7.5 50Z"
                  fill={GrayScale.G800}
                  fillOpacity="0.5"
                />
                {pmValuePath && (
                  <path
                    d={pmValuePath}
                    stroke={pmValueColor}
                    strokeWidth="7.5"
                    fill="none"
                    strokeLinecap="round"
                    css={pmValueAnimation.animationStyle}
                  />
                )}
              </svg>
            </div>
            <div css={S.DustValueWrapper}>
              <div css={S.DustValue}>{airQualityData.pm10Value || 0}</div>
              <div css={S.DustUnit}>µg/m³</div>
            </div>
          </div>
        </div>
        <div css={S.DustSection}>
          <h3>초미세먼지(PM2.5)</h3>
          <p>{pm25ValueLevel}</p>
          <div css={S.DustChartRow}>
            <div css={S.DustChartWrapper}>
              <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                <path
                  d="M100 50C100 77.6142 77.6142 100 50 100C22.3858 100 0 77.6142 0 50C0 22.3858 22.3858 0 50 0C77.6142 0 100 22.3858 100 50ZM7.5 50C7.5 73.4721 26.5279 92.5 50 92.5C73.4721 92.5 92.5 73.4721 92.5 50C92.5 26.5279 73.4721 7.5 50 7.5C26.5279 7.5 7.5 26.5279 7.5 50Z"
                  fill={GrayScale.G800}
                  fillOpacity="0.5"
                />
                {pm25ValuePath && (
                  <path
                    d={pm25ValuePath}
                    stroke={pm25ValueColor}
                    strokeWidth="7.5"
                    fill="none"
                    strokeLinecap="round"
                    css={pm25ValueAnimation.animationStyle}
                  />
                )}
              </svg>
            </div>
            <div css={S.DustValueWrapper}>
              <div css={S.DustValue}>{airQualityData.pm25Value || 0}</div>
              <div css={S.DustUnit}>µg/m³</div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div css={S.WeatherBoardDust}>
      <WeatherErrorBoundary title="미세먼지">
        <Suspense
          fallback={
            <CircularSpinner minHeight={180} color={ColorPrimary.B700} />
          }
        >
          <DustContent />
        </Suspense>
      </WeatherErrorBoundary>
    </div>
  );
};

export default WeatherBoardDust;
