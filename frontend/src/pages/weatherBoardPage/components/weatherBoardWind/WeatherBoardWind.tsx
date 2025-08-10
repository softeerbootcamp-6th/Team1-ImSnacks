import S from './WeatherBoardWind.style';
import { Typography } from '@/styles/typography';
import WindArrow from '@/assets/icons/flat/WindArrow.svg?react';
import { GrayScale } from '@/styles/colors';

interface WeatherBoardWindProps {
  direction: string;
  speed: number;
  degree: number;
}

const WeatherBoardWind = ({
  direction,
  speed,
  degree,
}: WeatherBoardWindProps) => {
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

        <WindArrow width="48" height="54" css={S.WindArrow(degree)} />
      </div>
      <h3>최고 풍속</h3>
      <p>
        {direction} • {speed}m/s
      </p>
    </div>
  );
};

export default WeatherBoardWind;
