import { getSubjectParticle } from '@/utils/koreanParticleUtil';
import S from './HeadLine.style';
import { LessCloudy } from '@/assets/iconComponents';
import { css } from '@emotion/react';

const HeadLine = () => {
  const nickName = '밤비';
  const data = {
    isRisk: true,
    startHour: 11,
    endHour: 15,
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

        {data.isRisk ? (
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
        <div>
          <LessCloudy
            width={160}
            height={124}
            css={css`
              z-index: 1;
            `}
          />
        </div>
      </div>
    </div>
  );
};
export default HeadLine;
