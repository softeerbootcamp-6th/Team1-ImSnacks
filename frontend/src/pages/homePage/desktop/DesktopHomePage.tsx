import WorkBlocksProvider from '@/pages/homePage/contexts/WorksProvider';
import Headline from '../components/headline/Headline';
import S from './DesktopHomePage.style';
import WorkContainer from '../components/workContainer/WorkContainer';
import DamagePests from '../components/damagePests/DamagePests';
import type { WeatherRiskDto } from '@/types/openapiGenerator';
import { getWeatherRisk } from '@/apis/weather.api';
import { useEffect, useState } from 'react';
import ContainerProvider from '../contexts/ContainerProvider';

const DesktopHomePage = () => {
  const [weatherRiskData, setWeatherRiskData] = useState<WeatherRiskDto[]>([]);
  const fetchWeatherRiskData = async () => {
    try {
      const res = await getWeatherRisk();
      if (res.data) setWeatherRiskData(res.data.items ?? []);
    } catch (error) {
      console.error('Error fetching weather risk data:', error);
    }
  };

  useEffect(() => {
    fetchWeatherRiskData();
  }, []);

  return (
    <div css={S.DesktopHomePage}>
      <Headline />
      <ContainerProvider>
        <WorkBlocksProvider>
          <WorkContainer weatherRiskData={weatherRiskData} />
        </WorkBlocksProvider>
      </ContainerProvider>
      <DamagePests />
    </div>
  );
};

export default DesktopHomePage;
