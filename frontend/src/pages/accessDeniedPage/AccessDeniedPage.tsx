import { useWeatherConditionStore } from '@/store/useWeatherConditionStore';
import S from './AccessDeniedPage.style';
import { backgroundTheme } from '@/constants/backgroundTheme';

const AccessDeniedPage = () => {
  const { weatherCondition } = useWeatherConditionStore();
  return (
    <div css={[S.Container, backgroundTheme[weatherCondition]]}>
      <div css={S.Content}>
        <h1 css={S.Title}>접근 제한</h1>
        <p css={S.Message}>해당 기기로는 이 페이지에 접근할 수 없습니다.</p>
        <p css={S.SubMessage}>데스크톱 환경에서 이용해주세요.</p>
      </div>
    </div>
  );
};

export default AccessDeniedPage;
