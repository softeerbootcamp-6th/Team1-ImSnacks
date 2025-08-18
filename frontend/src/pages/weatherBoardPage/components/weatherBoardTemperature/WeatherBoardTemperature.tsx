import { GrayScale } from '@/styles/colors';
import { Typography } from '@/styles/typography';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { getTemperatureColor } from '../../utils/temperatureUtil';
import TemperatureDot from '../temperatureDot/TemperatureDot';
import S from './WeatherBoardTemperature.style';
import type { GetTemperatureResponse } from '@/types/openapiGenerator';
import { useEffect, useState } from 'react';
import { getWeatherTemperature } from '@/apis/weather.api';

const WeatherBoardTemperature = () => {
  const [temperatureData, setTemperatureData] =
    useState<GetTemperatureResponse>();

  const fetchTemperatureData = async () => {
    try {
      const res = await getWeatherTemperature();
      if (res.data) {
        setTemperatureData(res.data);
      }
    } catch (error) {
      console.error('온도 데이터를 가져오는 데 실패했습니다:', error);
    }
  };

  useEffect(() => {
    fetchTemperatureData();
  }, []);

  const temperatureGradient = (
    <defs>
      <linearGradient
        id="temperatureGradient"
        x1="0%"
        y1="0%"
        x2="100%"
        y2="0%"
      >
        {temperatureData?.temperaturePerTime &&
          temperatureData.temperaturePerTime.map((item, index) => {
            const offset =
              (index /
                ((temperatureData.temperaturePerTime?.length ?? 1) - 1)) *
              100;
            const color = getTemperatureColor(item.value ?? 0);
            return <stop key={index} offset={`${offset}%`} stopColor={color} />;
          })}
      </linearGradient>
    </defs>
  );

  return (
    <div css={S.WeatherBoardTemperature}>
      <div css={S.WeatherBoardTemperatureTitle}>
        <h3>최고기온</h3>
        <p>{temperatureData?.maxTemperature ?? '-'}°</p>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={temperatureData?.temperaturePerTime}
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
              (temperatureData?.minTemperature ?? 0) - 20,
              temperatureData?.maxTemperature ?? 0,
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
