import { GrayScale } from '@/styles/colors';
import { Typography } from '@/styles/typography';
import { WEATHER_CONDITIONS } from '@/types/weather.types';
import { css } from '@emotion/react';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { getTemperatureColor } from '../../utils/temperatureUtil';
import TemperatureDot from '../temperatureDot/TemperatureDot';
import S from './WeatherBoardTemperature.style';

const temperatureData = {
  highestTemperature: 30,
  weeklyTemperature: [
    {
      time: '02:00',
      temperature: -10,
      weather: WEATHER_CONDITIONS.SUNNY,
    },
    {
      time: '05:00',
      temperature: 5,
      weather: WEATHER_CONDITIONS.LESS_CLOUDY,
    },
    {
      time: '08:00',
      temperature: 22,
      weather: WEATHER_CONDITIONS.CLOUDY,
    },
    {
      time: '11:00',
      temperature: 40,
      weather: WEATHER_CONDITIONS.CLOUDY_NIGHT,
    },
    {
      time: '14:00',
      temperature: 30,
      weather: WEATHER_CONDITIONS.SUNNY,
    },
    {
      time: '17:00',
      temperature: 25,
      weather: WEATHER_CONDITIONS.RAIN,
    },
    {
      time: '20:00',
      temperature: 25,
      weather: WEATHER_CONDITIONS.HEAVY_RAIN,
    },
    {
      time: '23:00',
      temperature: 17,
      weather: WEATHER_CONDITIONS.SNOW,
    },
  ],
};

const WeatherBoardTemperature = () => {
  // 온도 데이터에서 최소값과 최대값 계산
  const temperatures = temperatureData.weeklyTemperature.map(
    item => item.temperature
  );
  const minTemp = Math.min(...temperatures);
  const maxTemp = Math.max(...temperatures);

  const adjustedMinTemp = minTemp - 20;

  const temperatureGradient = (
    <defs>
      <linearGradient
        id="temperatureGradient"
        x1="0%"
        y1="0%"
        x2="100%"
        y2="0%"
      >
        {temperatureData.weeklyTemperature.map((item, index) => {
          const offset =
            (index / (temperatureData.weeklyTemperature.length - 1)) * 100;
          const color = getTemperatureColor(item.temperature);
          return <stop key={index} offset={`${offset}%`} stopColor={color} />;
        })}
      </linearGradient>
    </defs>
  );

  return (
    <div css={S.WeatherBoardTemperature}>
      <div css={S.WeatherBoardTemperatureTitle}>
        <h3>최고기온</h3>
        <p>{temperatureData.highestTemperature}°</p>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={temperatureData.weeklyTemperature}
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
          <YAxis domain={[adjustedMinTemp, maxTemp]} hide />
          <Line
            type="monotone"
            dataKey="temperature"
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
