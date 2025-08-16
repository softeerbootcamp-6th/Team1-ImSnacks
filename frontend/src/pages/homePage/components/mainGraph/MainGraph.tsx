import S from './MainGraph.style';
import MainLineChart from '../mainLineChart/MainLineChart';
import { GetWeatherGraphResponse } from '@/types/openapiGenerator';

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

const MainGraph = ({ graphData }: { graphData?: GetWeatherGraphResponse }) => {
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
