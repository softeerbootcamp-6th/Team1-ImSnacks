import { Suspense } from 'react';
import { css } from '@emotion/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import S from './WeatherBoardUV.style';
import { FlexStyles } from '@/styles/commonStyles';
import { Typography } from '@/styles/typography';
import { GrayScale } from '@/styles/colors';
import { getWeatherUV } from '@/apis/weather.api';
import { GetUVInfoResponse } from '@/types/openapiGenerator';
import { getUVLevelAndColor } from '../../utils/uvUtil';
import { CircularSpinner } from '@/components/common/CircularSpinner';
import WeatherErrorBoundary from '@/components/common/WeatherErrorBoundary';

const WeatherBoardUV = () => {
  const UVContent = () => {
    const { data: uv } = useSuspenseQuery({
      queryKey: ['weather', 'uv'],
      queryFn: async (): Promise<GetUVInfoResponse> => {
        const res = await getWeatherUV();
        return res.data;
      },
      staleTime: 24 * 60 * 60 * 1000,
    });

    const { level, color } = getUVLevelAndColor(uv.value ?? 0);

    return (
      <div css={S.WeatherBoardUVContentWrapper}>
        <div
          css={css`
            ${FlexStyles.flexColumn};
            margin-bottom: 12px;
          `}
        >
          <p>{uv.value}</p>
          <span css={Typography.Caption_S}>{level}</span>
        </div>

        <svg
          width="428"
          height="74"
          viewBox="0 0 428 74"
          fill="none"
          css={S.WeatherBoardUVSvg}
        >
          <line x1="0" y1="70.5" x2="427" y2="70.5" stroke={GrayScale.G900} />
          <path
            d="M1 71C89.8469 71 133.944 5 213.5 5C303.496 5 333.867 71 428 71"
            stroke="url(#paint0_linear_11858_5916)"
            strokeWidth="5"
            css={S.WeatherBoardUVPath}
          />
          <defs>
            <linearGradient
              id="paint0_linear_11858_5916"
              x1="1.83068"
              y1="41.76"
              x2="427.141"
              y2="41.76"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#26A49C" stopOpacity="0" />
              <stop offset="0.5" stopColor={color} />
              <stop offset="1" stopColor="#26A49C" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        <div css={S.WeatherBoardUVTimeWrapper}>
          <span css={S.WeatherBoardUVTime}>{uv.startTime}</span>
          <span css={S.WeatherBoardUVTime}>{uv.endTime}</span>
        </div>
      </div>
    );
  };

  return (
    <div css={S.WeatherBoardUV}>
      <WeatherErrorBoundary title="자외선">
        <Suspense fallback={<CircularSpinner minHeight={180} />}>
          <h3 css={S.WeatherBoardUVTitle}>자외선</h3>

          <div css={S.WeatherBoardUVContent}>
            <UVContent />
          </div>
        </Suspense>
      </WeatherErrorBoundary>
    </div>
  );
};

export default WeatherBoardUV;
