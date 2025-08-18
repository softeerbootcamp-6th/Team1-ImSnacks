import { getSubjectParticle } from '@/utils/koreanParticleUtil';
import S from './Headline.style';
import { GLASS_ICON } from '@/constants/glassIcon';
import { css } from '@emotion/react';
import { useUserStore } from '@/store/useUserStore';
import { useWeatherConditionStore } from '@/store/useWeatherConditionStore';
import { useTimeStore } from '@/store/useTimeStore';
import { GetWeatherBriefingResponse } from '@/types/openapiGenerator';
import { useEffect, useState } from 'react';
import { getWeatherBriefing } from '@/apis/weather.api';
import { formatCurrentTime } from '@/utils/formatTimeUtil';

const Headline = () => {
  const { nickName } = useUserStore();
  const { weatherCondition } = useWeatherConditionStore();
  const { currentTime } = useTimeStore();

  const GlassIconComponent = GLASS_ICON[weatherCondition];

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

  return (
    <div css={S.Headline}>
      <div css={S.GreetingMessage}>
        <div>좋은 아침이에요, {nickName}님!</div>

        {briefingData?.hasWeatherRisk ? (
          <div css={S.WeatherRisk}>
            <span css={S.WeatherRiskText}>{briefingData.weatherMsg}</span>
            <span
              css={css`
                margin-left: 8px;
              `}
            >
              {getSubjectParticle(briefingData.weatherMsg ?? '')} 예상돼요.
            </span>
          </div>
        ) : (
          <span css={S.WeatherRiskText}>{briefingData?.weatherMsg}</span>
        )}
      </div>
      <div css={S.HeadlineWeather}>
        <div css={S.HeadlineDate}>
          <span>{formatCurrentTime(currentTime).date}</span>
          <span>{formatCurrentTime(currentTime).time}</span>
        </div>
        <GlassIconComponent
          width={200}
          height={150}
          css={S.HeadlineWeatherIcon}
        />
      </div>
    </div>
  );
};
export default Headline;
