import { useState } from 'react';
import GraphMenu from '../graphMenu/GraphMenu';
import S from './MainGraph.style';
import MainLineChart from '../mainLineChart/MainLineChart';
import { WEATHER_METRICS, type WeatherMetrics } from '@/types/weather.types';
import dayjs from 'dayjs';

const now = dayjs();

const graphData = {
  min: 0,
  max: 30,
  weatherMetric: WEATHER_METRICS.PERCIPITATION,
  valuePerTime: [
    {
      name: now.hour().toString(),
      value: 13,
    },
    {
      name: now.add(1, 'hour').hour().toString(),
      value: 15,
    },
    {
      name: now.add(2, 'hour').hour().toString(),
      value: 17,
    },
    {
      name: now.add(3, 'hour').hour().toString(),
      value: 25,
    },
    {
      name: now.add(4, 'hour').hour().toString(),
      value: 20,
    },
    {
      name: now.add(5, 'hour').hour().toString(),
      value: 12,
    },
    {
      name: now.add(6, 'hour').hour().toString(),
      value: 12,
    },
    {
      name: now.add(7, 'hour').hour().toString(),
      value: 11,
    },
    {
      name: now.add(8, 'hour').hour().toString(),
      value: 10,
    },
    {
      name: now.add(9, 'hour').hour().toString(),
      value: 2,
    },
    {
      name: now.add(10, 'hour').hour().toString(),
      value: 1,
    },
    {
      name: now.add(11, 'hour').hour().toString(),
      value: 2,
    },
    {
      name: now.add(12, 'hour').hour().toString(),
      value: 1,
    },
    {
      name: now.add(13, 'hour').hour().toString(),
      value: 20,
    },
    {
      name: now.add(14, 'hour').hour().toString(),
      value: 0,
    },
    {
      name: now.add(15, 'hour').hour().toString(),
      value: 10,
    },
    {
      name: now.add(16, 'hour').hour().toString(),
      value: 0,
    },
    {
      name: now.add(17, 'hour').hour().toString(),
      value: 0,
    },
    {
      name: now.add(18, 'hour').hour().toString(),
      value: 5,
    },
    {
      name: now.add(19, 'hour').hour().toString(),
      value: 7,
    },
    {
      name: now.add(20, 'hour').hour().toString(),
      value: 10,
    },
    {
      name: now.add(21, 'hour').hour().toString(),
      value: 12,
    },
    {
      name: now.add(22, 'hour').hour().toString(),
      value: 11,
    },
    {
      name: now.add(23, 'hour').hour().toString(),
      value: 10,
    },
  ],
};

const weatherRiskData = [
  {
    category: '호우',
    startTime: '10',
    endTime: '12',
  },
  {
    category: '이상저온',
    startTime: '12',
    endTime: '14',
  },
  {
    category: '한파',
    startTime: '17',
    endTime: '01',
  },
];

const MainGraph = () => {
  const [currentTab, setCurrentTab] = useState<WeatherMetrics>(
    WEATHER_METRICS.PERCIPITATION
  );

  return (
    <div css={S.MainGraph}>
      <GraphMenu currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <MainLineChart graphData={graphData} weatherRiskData={weatherRiskData} />
    </div>
  );
};
export default MainGraph;
