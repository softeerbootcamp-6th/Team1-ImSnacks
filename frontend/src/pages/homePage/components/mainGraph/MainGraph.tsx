import S from './MainGraph.style';
import MainLineChart from '../mainLineChart/MainLineChart';
import {
  GetWeatherGraphResponse,
  WeatherRiskDto,
} from '@/types/openapiGenerator';

const MainGraph = ({
  graphData,
  weatherRiskData,
}: {
  graphData?: GetWeatherGraphResponse;
  weatherRiskData: WeatherRiskDto[];
}) => {
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
