import { css } from '@emotion/react';
import { getUVLevelAndColor } from '../../utils/uvUtil';
import S from './WeatherBoardUV.style';
import { FlexStyles } from '@/styles/commonStyles';
import { Typography } from '@/styles/typography';
import { GrayScale } from '@/styles/colors';
import { getWeatherUV } from '@/apis/weather.api';
import { useEffect, useState } from 'react';
import { GetUVInfoResponse } from '@/types/openapiGenerator';

const WeatherBoardUV = () => {
  const [uvData, setUVData] = useState<GetUVInfoResponse>();
  const { level, color } = getUVLevelAndColor(uvData?.value || 0);

  const fetchUVData = async () => {
    try {
      const res = await getWeatherUV();
      if (res.data) {
        setUVData(res.data);
      }
    } catch (error) {
      console.error('Error fetching UV data:', error);
    }
  };

  useEffect(() => {
    fetchUVData();
  }, []);

  return (
    <div css={S.WeatherBoardUV}>
      <h3 css={S.WeatherBoardUVTitle}>자외선</h3>
      <div css={S.WeatherBoardUVContent}>
        <div
          css={css`
            ${FlexStyles.flexColumn};
            margin-bottom: 18px;
          `}
        >
          <p>{uvData?.value}</p>
          <span css={Typography.Caption_S}>{level}</span>
        </div>
        <svg
          width="428"
          height="74"
          viewBox="0 0 428 74"
          fill="none"
          css={S.WeatherBoardUVSvg}
        >
          <line
            x1="-4.37114e-08"
            y1="70.5"
            x2="427"
            y2="70.5"
            stroke={GrayScale.G900}
          />
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
          <span css={S.WeatherBoardUVTime}>{uvData?.startTime}</span>
          <span css={S.WeatherBoardUVTime}>{uvData?.endTime}</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherBoardUV;
