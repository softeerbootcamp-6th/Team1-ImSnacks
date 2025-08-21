import { GrayScale } from '@/styles/colors';
import { Typography } from '@/styles/typography';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { getTemperatureColor } from '../../utils/temperatureUtil';
import TemperatureDot from '../temperatureDot/TemperatureDot';
import S from './WeatherBoardTemperature.style';
import type { GetTemperatureResponse } from '@/types/openapiGenerator';
import { Suspense } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getWeatherTemperature } from '@/apis/weather.api';
import { CircularSpinner } from '@/components/common/CircularSpinner';

const WeatherBoardTemperature = () => {
  const Content = () => {
    const { data: temperatureData } = useSuspenseQuery({
      queryKey: ['weather', 'temperature'],
      queryFn: async (): Promise<GetTemperatureResponse> => {
        const res = await getWeatherTemperature();
        return res.data;
      },
      staleTime: 24 * 60 * 60 * 1000,
    });

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
            temperatureData.temperaturePerTime.map((item, index) => {
              const offset =
                (index /
                  ((temperatureData.temperaturePerTime?.length ?? 1) - 1)) *
                100;
              const color = getTemperatureColor(item.value ?? 0);
              return (
                <stop key={index} offset={`${offset}%`} stopColor={color} />
              );
            })}
        </linearGradient>
      </defs>
    );

    return (
      <>
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
      </>
    );
  };

  return (
    <div css={S.WeatherBoardTemperature}>
      <Suspense fallback={<CircularSpinner minHeight={300} />}>
        <Content />
      </Suspense>
    </div>
  );
};

export default WeatherBoardTemperature;
