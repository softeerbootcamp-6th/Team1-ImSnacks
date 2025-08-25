import S from './MainGraph.style';
import MainLineChart from '../mainLineChart/MainLineChart';
import {
  GetWeatherGraphResponse,
  WeatherRiskDto,
} from '@/types/openapiGenerator';
import { memo } from 'react';

const MainGraph = memo(
  ({
    graphData,
    weatherRiskData,
    isError = false,
  }: {
    graphData?: GetWeatherGraphResponse;
    weatherRiskData: WeatherRiskDto[];
    isError?: boolean;
  }) => {
    return (
      <div css={S.MainGraph} onMouseDown={e => e.preventDefault()}>
        <MainLineChart
          graphData={graphData as GetWeatherGraphResponse}
          weatherRiskData={weatherRiskData}
          isError={isError}
        />
      </div>
    );
  }
);
export default MainGraph;
