import WorkBlocksProvider from '@/pages/homePage/contexts/WorksProvider';
import Headline from '../components/headline/Headline';
import S from './DesktopHomePage.style';
import WorkContainer from '../components/workContainer/WorkContainer';
import RegisterWorkContainer from '../components/registerWorkContainer/RegisterWorkContainer';
import DamagePests from '../components/damagePests/DamagePests';
import type { WeatherRiskDto } from '@/types/openapiGenerator';
import { getWeatherRisk } from '@/apis/weather.api';
import { useEffect, useState } from 'react';

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
      <WorkBlocksProvider>
        <WorkContainer weatherRiskData={weatherRiskData} />
        <RegisterWorkContainer />
      </WorkBlocksProvider>
      <DamagePests />
    </div>
  );
};

export default DesktopHomePage;
