import { GrayScale } from '@/styles/colors';
import {
  getFineDustLevelAndColor,
  getUltrafineDustLevelAndColor,
  createCircularProgressPath,
} from '../../utils/dustUtil';
import { useDustAnimation } from '../../hooks/useDustAnimation';
import S from './WeatherBoardDust.style';

const WeatherBoardDust = ({
  fineDustValue,
  ultrafineDustValue,
}: {
  fineDustValue: number;
  ultrafineDustValue: number;
}) => {
  const { level: fineDustLevel, color: fineDustColor } =
    getFineDustLevelAndColor(fineDustValue);
  const { level: ultrafineDustLevel, color: ultrafineDustColor } =
    getUltrafineDustLevelAndColor(ultrafineDustValue);

  // path 생성
  const fineDustPath = createCircularProgressPath(fineDustValue, 180);
  const ultrafineDustPath = createCircularProgressPath(ultrafineDustValue, 100);

  // 애니메이션 훅 사용
  const fineDustAnimation = useDustAnimation(fineDustValue, 180);
  const ultrafineDustAnimation = useDustAnimation(ultrafineDustValue, 100);

  return (
    <div css={S.WeatherBoardDust}>
      <div css={S.DustSection}>
        <h3>미세먼지(PM10)</h3>
        <p>{fineDustLevel}</p>
        <div css={S.DustChartWrapper}>
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
            <path
              d="M100 50C100 77.6142 77.6142 100 50 100C22.3858 100 0 77.6142 0 50C0 22.3858 22.3858 0 50 0C77.6142 0 100 22.3858 100 50ZM7.5 50C7.5 73.4721 26.5279 92.5 50 92.5C73.4721 92.5 92.5 73.4721 92.5 50C92.5 26.5279 73.4721 7.5 50 7.5C26.5279 7.5 7.5 26.5279 7.5 50Z"
              fill={GrayScale.G800}
              fillOpacity="0.5"
            />

            {fineDustPath && (
              <path
                d={fineDustPath}
                stroke={fineDustColor}
                strokeWidth="7.5"
                fill="none"
                strokeLinecap="round"
                css={fineDustAnimation.animationStyle}
              />
            )}
          </svg>
          <div css={S.DustValueWrapper}>
            <div css={S.DustValue}>{fineDustValue}</div>
            <div css={S.DustUnit}>µg/m³</div>
          </div>
        </div>
      </div>
      <div css={S.DustSection}>
        <h3>초미세먼지(PM2.5)</h3>
        <p>{ultrafineDustLevel}</p>
        <div css={S.DustChartWrapper}>
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
            <path
              d="M100 50C100 77.6142 77.6142 100 50 100C22.3858 100 0 77.6142 0 50C0 22.3858 22.3858 0 50 0C77.6142 0 100 22.3858 100 50ZM7.5 50C7.5 73.4721 26.5279 92.5 50 92.5C73.4721 92.5 92.5 73.4721 92.5 50C92.5 26.5279 73.4721 7.5 50 7.5C26.5279 7.5 7.5 26.5279 7.5 50Z"
              fill={GrayScale.G800}
              fillOpacity="0.5"
            />

            {ultrafineDustPath && (
              <path
                d={ultrafineDustPath}
                stroke={ultrafineDustColor}
                strokeWidth="7.5"
                fill="none"
                strokeLinecap="round"
                css={ultrafineDustAnimation.animationStyle}
              />
            )}
          </svg>
          <div css={S.DustValueWrapper}>
            <div css={S.DustValue}>{ultrafineDustValue}</div>
            <div css={S.DustUnit}>µg/m³</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherBoardDust;
