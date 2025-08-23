import { Typography } from '@/styles/typography';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { getTemperatureColor } from '../../utils/temperatureUtil';
import TemperatureDot from '../temperatureDot/TemperatureDot';
import S from './WeatherBoardTemperature.style';
import type { GetTemperatureResponse } from '@/types/openapiGenerator';
import { useQuery } from '@tanstack/react-query';
import { getWeatherTemperature } from '@/apis/weather.api';
import { CircularSpinner } from '@/components/common/CircularSpinner';
import { css } from '@emotion/react';
import { GrayScale } from '@/styles/colors';

const WeatherBoardTemperature = () => {
  const {
    data: temperatureData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['weather', 'temperature'],
    queryFn: async (): Promise<GetTemperatureResponse> => {
      const res = await getWeatherTemperature();
      return res.data;
    },
    staleTime: 24 * 60 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div css={S.WeatherBoardTemperature}>
        <CircularSpinner minHeight={300} />
      </div>
    );
  }

  if (error || !temperatureData) {
    return (
      <div css={S.WeatherBoardTemperature}>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 300px;
            color: ${GrayScale.White};
            text-align: center;

            h3 {
              ${Typography.Body_M_700}
              margin-bottom: 8px;
            }

            p {
              ${Typography.Caption}
              opacity: 0.7;
            }
          `}
        >
          <h3>온도 정보를 불러오는데 실패했습니다</h3>
          <p>잠시 후 다시 시도해주세요.</p>
        </div>
      </div>
    );
  }

  const temperatureGradient = (
    <defs>
      <linearGradient
        id="temperatureGradient"
        x1="0%"
        y1="0%"
        x2="100%"
        y2="0%"
      >
        {temperatureData.temperaturePerTime &&
          temperatureData.temperaturePerTime.map(
            (item: { value?: number }, index: number) => {
              const offset =
                (index /
                  ((temperatureData.temperaturePerTime?.length ?? 1) - 1)) *
                100;
              const color = getTemperatureColor(item.value ?? 0);
              return (
                <stop key={index} offset={`${offset}%`} stopColor={color} />
              );
            }
          )}
      </linearGradient>
    </defs>
  );

  return (
    <div css={S.WeatherBoardTemperature}>
      <div css={S.WeatherBoardTemperatureTitle}>
        <h3>최고기온</h3>
        <p>{temperatureData.maxTemperature}°</p>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={temperatureData.temperaturePerTime}
          margin={{ top: 90, right: 30, left: 30 }}
        >
          {temperatureGradient}
          <XAxis
            dataKey="time"
            axisLine={false}
            tickLine={false}
            tick={{
              fill: GrayScale.White,
              ...Typography.Caption,
            }}
            padding={{ left: 20, right: 20 }}
          />
          <YAxis
            domain={[
              (temperatureData.minTemperature ?? 0) - 3,
              temperatureData.maxTemperature ?? 0,
            ]}
            hide
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="url(#temperatureGradient)"
            strokeWidth={3}
            dot={<TemperatureDot cx={0} cy={0} />}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeatherBoardTemperature;
