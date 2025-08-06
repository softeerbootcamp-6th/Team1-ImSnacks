import { useState } from 'react';
import GraphMenu from '../graphMenu/GraphMenu';
import S from './MainGraph.style';
import MainLineChart from '../mainLineChart/MainLineChart';
import { WEATHER_METRICS, type WeatherMetrics } from '@/types/weather.types';

const graphData = {
  min: 0,
  max: 30,
  weatherMetric: WEATHER_METRICS.PRECIPITATION,
  valuePerTime: [
    {
      name: '08',
      value: 13,
    },
    {
      name: '09',
      value: 15,
    },
    {
      name: '10',
      value: 17,
    },
    {
      name: '11',
      value: 25,
    },
    {
      name: '12',
      value: 20,
    },
    {
      name: '13',
      value: 12,
    },
    {
      name: '14',
      value: 12,
    },
    {
      name: '15',
      value: 11,
    },
    {
      name: '16',
      value: 10,
    },
    {
      name: '17',
      value: 2,
    },
    {
      name: '18',
      value: 1,
    },
    {
      name: '19',
      value: 2,
    },
    {
      name: '20',
      value: 1,
    },
    {
      name: '21',
      value: 0,
    },
    {
      name: '22',
      value: 0,
    },
    {
      name: '23',
      value: 0,
    },
    {
      name: '24',
      value: 0,
    },
    {
      name: '01',
      value: 0,
    },
    {
      name: '02',
      value: 5,
    },
    {
      name: '03',
      value: 7,
    },
    {
      name: '04',
      value: 10,
    },
    {
      name: '05',
      value: 12,
    },
    {
      name: '06',
      value: 11,
    },
    {
      name: '07',
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
    category: '폭염',
    startTime: '12',
    endTime: '14',
  },
];

const MainGraph = () => {
  const [currentTab, setCurrentTab] = useState<WeatherMetrics>(
    WEATHER_METRICS.PRECIPITATION
  );

  return (
    <div css={S.MainGraph}>
      <GraphMenu currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <MainLineChart graphData={graphData} weatherRiskData={weatherRiskData} />
    </div>
  );
};
export default MainGraph;
