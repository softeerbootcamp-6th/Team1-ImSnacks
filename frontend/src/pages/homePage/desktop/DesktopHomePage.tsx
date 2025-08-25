import Headline from './components/headline/Headline';
import S from './DesktopHomePage.style';
import WorkContainer from './components/workContainer/WorkContainer';
import DamagePests from './components/damagePests/DamagePests';
import type { WeatherRiskDto } from '@/types/openapiGenerator';
import { getWeatherRisk } from '@/apis/weather.api';
import { useCallback, useEffect, useState } from 'react';
import { useTimeStore } from '@/store/useTimeStore';

const DesktopHomePage = () => {
  const { currentTime } = useTimeStore();
  const [weatherRiskData, setWeatherRiskData] = useState<WeatherRiskDto[]>([]);
  const fetchWeatherRiskData = useCallback(async () => {
    try {
      const res = await getWeatherRisk();
      if (res.data) setWeatherRiskData(res.data.items ?? []);
    } catch (error) {
      console.error('Error fetching weather risk data:', error);
    }
  }, []);

  useEffect(() => {
    fetchWeatherRiskData();
  }, [fetchWeatherRiskData]);

  // currentTime이 정각이 될 때마다 실행
  useEffect(() => {
    if (currentTime.minute() === 0) {
      fetchWeatherRiskData();
    }
  }, [currentTime, fetchWeatherRiskData]);

  return (
    <div css={S.DesktopHomePage}>
      <Headline />
      <WorkContainer weatherRiskData={weatherRiskData} />
      <DamagePests />
    </div>
  );
};

export default DesktopHomePage;
