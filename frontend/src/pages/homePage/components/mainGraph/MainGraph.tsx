import { useEffect, useState } from 'react';
import S from './MainGraph.style';
import MainLineChart from '../mainLineChart/MainLineChart';
import { type WeatherMetrics } from '@/types/weather.types';
import { GetWeatherGraphResponse } from '@/types/openapiGenerator';
import { getWeatherGraph } from '@/apis/weather.api';

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

const MainGraph = ({ currentTab }: { currentTab: WeatherMetrics }) => {
  const [graphData, setGraphData] = useState<GetWeatherGraphResponse>();

  useEffect(() => {
    let ignore = false; // 빠른 탭 전환시 최신 응답만 반영
    (async () => {
      try {
        const res = await getWeatherGraph(currentTab);
        if (!ignore && res.data) setGraphData(res.data);
        console.log('Graph data fetched:', res.data);
      } catch (e) {
        if (!ignore) console.error('Error fetching graph data:', e);
      }
    })();
    return () => {
      ignore = true;
    };
  }, [currentTab]);

  return (
    <div css={S.MainGraph}>
      <MainLineChart
        graphData={graphData as GetWeatherGraphResponse}
        weatherRiskData={weatherRiskData}
      />
    </div>
  );
};
export default MainGraph;
