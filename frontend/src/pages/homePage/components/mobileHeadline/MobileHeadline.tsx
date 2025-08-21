import { getSubjectParticle } from '@/utils/koreanParticleUtil';
import S from './MobileHeadline.style';
import { useEffect, useState } from 'react';
import { getWeatherBriefing } from '@/apis/weather.api';
import type { GetWeatherBriefingResponse } from '@/types/openapiGenerator';
import { useUserStore } from '@/store/useUserStore';

const MobileHeadline = () => {
  const { nickName } = useUserStore();

  const [briefingData, setBriefingData] =
    useState<GetWeatherBriefingResponse>();

  const fetchWeatherBriefingData = async () => {
    try {
      const res = await getWeatherBriefing();
      if (res.data) setBriefingData(res.data);
    } catch (error) {
      console.error('Error fetching weather briefing data:', error);
    }
  };

  useEffect(() => {
    fetchWeatherBriefingData();
  }, []);

  const getLinebreakIndex = (message: string) => {
    const index = message.indexOf('지');
    return index !== -1 ? index + 1 : message.length;
  };

  return (
    <div css={S.MobileHeadline}>
      <div css={S.MobileGreetingMessage}>좋은 아침이에요, {nickName}님!</div>
      <h2 css={S.WeatherRisk}>
        {briefingData?.hasWeatherRisk ? (
          <span>
            {(briefingData.weatherMsg ?? '').slice(
              0,
              getLinebreakIndex(briefingData.weatherMsg ?? '')
            )}
            <br />
            {(briefingData.weatherMsg ?? '').slice(
              getLinebreakIndex(briefingData.weatherMsg ?? '')
            )}
            {getSubjectParticle(briefingData.weatherMsg ?? '')} 예상돼요.
          </span>
        ) : (
          <span>{briefingData?.weatherMsg}</span>
        )}
      </h2>
    </div>
  );
};
export default MobileHeadline;
