import { getSubjectParticle } from '@/utils/koreanParticleUtil';
import S from './Headline.style';
import { GLASS_ICON } from '@/constants/glassIcon';
import { css } from '@emotion/react';
import { useUserStore } from '@/store/useUserStore';
import { useWeatherConditionStore } from '@/store/useWeatherConditionStore';
import { useTimeStore } from '@/store/useTimeStore';
import type dayjs from 'dayjs';

const Headline = () => {
  const { nickName } = useUserStore();
  const { weatherCondition } = useWeatherConditionStore();
  const { currentTime } = useTimeStore();

  const GlassIconComponent = GLASS_ICON[weatherCondition];

  const data = {
    hasWeatherRisk: true,
    message: '오전 11시부터 오후 3시까지 우박',
  };

  const formatCurrentTime = (currentTime: dayjs.Dayjs) => {
    return {
      date: currentTime.format('M월 D일'),
      time: currentTime.format('h:mm A'),
    };
  };

  return (
    <div css={S.Headline}>
      <div css={S.GreetingMessage}>
        <div>좋은 아침이에요, {nickName}님!</div>

        {data.hasWeatherRisk ? (
          <div css={S.WeatherRisk}>
            <span css={S.WeatherRiskText}>{data.message}</span>
            <span
              css={css`
                margin-left: 8px;
              `}
            >
              {getSubjectParticle(data.message)} 예상돼요.
            </span>
          </div>
        ) : (
          <span>{data.message}</span>
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
