import { CircularSpinner } from '@/components/common/CircularSpinner';
import { ColorPrimary, GrayScale } from '@/styles/colors';
import { getHumidityPath } from '../../utils/humidityUtil';
import S from './WeatherBoardHumidity.style';
import { Suspense, useEffect, useRef } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { GetHumidityResponse } from '@/types/openapiGenerator';
import { getWeatherHumidity } from '@/apis/weather.api';

const WeatherBoardHumidity = () => {
  const Content = () => {
    const { data: humidityValue } = useSuspenseQuery({
      queryKey: ['weather', 'humidity'],
      queryFn: async (): Promise<GetHumidityResponse> => {
        const res = await getWeatherHumidity();
        return res.data;
      },
      staleTime: 24 * 60 * 60 * 1000,
    });
    const humidityPath = getHumidityPath(humidityValue.value ?? 0);
    const pathRef = useRef<SVGPathElement | null>(null);
    useEffect(() => {
      if (pathRef.current) {
        const totalLength = pathRef.current.getTotalLength(); // path의 총 길이
        pathRef.current.style.strokeDasharray = totalLength.toString();
        pathRef.current.style.strokeDashoffset = totalLength.toString();
        const animationDuration = 1;
        let startTime: number;
        const animatePath = (timestamp: number) => {
          if (!startTime) startTime = timestamp;
          const progress = (timestamp - startTime) / (animationDuration * 1000);
          const dashOffset = totalLength - totalLength * progress;
          if (!pathRef.current) return;
          pathRef.current.style.strokeDashoffset = dashOffset.toString();
          if (progress < 1) {
            requestAnimationFrame(animatePath);
          }
        };
        requestAnimationFrame(animatePath); // 애니메이션 시작
      }
    }, [humidityValue]);

    return (
      <>
        <div css={S.WeatherBoardTitleWrapper}>
          <h3>최고 습도</h3>
          <p>{humidityValue.value}%</p>
        </div>
        <div
          style={{
            position: 'absolute',
            top: 2,
          }}
        >
          <svg width="297" height="297" viewBox="0 0 297 297" fill="none">
            <path
              d="M81.6708 215.314C77.5703 219.415 70.8753 219.445 67.2046 214.955C56.3497 201.679 48.8763 185.901 45.51 168.977C41.4585 148.609 43.5379 127.497 51.4851 108.311C59.4323 89.1244 72.8904 72.7257 90.1575 61.1881C107.425 49.6506 127.725 43.4924 148.492 43.4924C169.259 43.4924 189.56 49.6506 206.827 61.1881C224.094 72.7257 237.553 89.1244 245.5 108.311C253.447 127.497 255.526 148.609 251.475 168.977C248.109 185.901 240.635 201.679 229.78 214.955C226.11 219.445 219.415 219.415 215.314 215.314V215.314C211.214 211.214 211.274 204.6 214.831 200.021C222.809 189.751 228.323 177.728 230.878 164.88C234.12 148.586 232.456 131.696 226.098 116.347C219.741 100.998 208.974 87.879 195.16 78.649C181.347 69.4189 165.106 64.4924 148.492 64.4924C131.879 64.4924 115.638 69.4189 101.825 78.649C88.0108 87.879 77.2443 100.998 70.8865 116.347C64.5288 131.696 62.8653 148.586 66.1065 164.88C68.662 177.728 74.1763 189.751 82.1534 200.021C85.7107 204.6 85.7713 211.214 81.6708 215.314V215.314Z"
              fill={GrayScale.G900}
            />
            {humidityPath && (
              <path
                ref={pathRef}
                d={humidityPath}
                stroke={ColorPrimary.B400}
                strokeWidth="20"
                fill="none"
                strokeLinecap="round"
              />
            )}
          </svg>
        </div>
        <div css={S.HumidityRangeTextWrapper}>
          <div css={S.HumidityRangeText}>0%</div>
          <div css={S.HumidityRangeText}>100%</div>
        </div>
      </>
    );
  };
  return (
    <div css={S.WeatherBoardHumidity}>
      <Suspense fallback={<CircularSpinner minHeight={180} />}>
        <Content />
      </Suspense>
    </div>
  );
};

export default WeatherBoardHumidity;
