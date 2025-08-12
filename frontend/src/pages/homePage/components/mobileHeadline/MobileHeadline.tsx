import { getSubjectParticle } from '@/utils/koreanParticleUtil';
import S from './MobileHeadline.style';

const MobileHeadline = () => {
  const nickName = '밤비';
  const data = {
    hasWeatherRisk: true,
    message: '오전 11시부터 오후 3시까지 우박',
  };

  const getLinebreakIndex = (message: string) => {
    const index = message.indexOf('지');
    return index !== -1 ? index + 1 : message.length;
  };

  return (
    <div css={S.MobileHeadline}>
      <div css={S.MobileGreetingMessage}>좋은 아침이에요, {nickName}님!</div>
      <h2 css={S.WeatherRisk}>
        {data.hasWeatherRisk ? (
          <span>
            {data.message.slice(0, getLinebreakIndex(data.message))}
            <br />
            {data.message.slice(getLinebreakIndex(data.message))}
            {getSubjectParticle(data.message)} 예상돼요.
          </span>
        ) : (
          <span>{data.message}</span>
        )}
      </h2>
    </div>
  );
};
export default MobileHeadline;
