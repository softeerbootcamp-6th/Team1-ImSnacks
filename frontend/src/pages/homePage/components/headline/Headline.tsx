import { getSubjectParticle } from '@/utils/koreanParticleUtil';
import S from './Headline.style';
import { LessCloudy } from '@/assets/iconComponents';
import { css } from '@emotion/react';

const Headline = () => {
  const nickName = '밤비';
  const data = {
    hasWeatherRisk: true,
    message: '오전 11시부터 오후 3시까지 우박',
  };

  const currentTime = {
    // m월 d일
    date: '8월 21일',
    // h:m am/pm
    time: '8:07 AM',
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
          <span>{currentTime.date}</span>
          <span>{currentTime.time}</span>
        </div>
        <LessCloudy width={200} height={150} css={S.HeadlineWeatherIcon} />
      </div>
    </div>
  );
};
export default Headline;
