import { useWeatherConditionStore } from '@/store/useWeatherConditionStore';
import S from './AccessDeniedPage.style';
import { backgroundTheme } from '@/constants/backgroundTheme';
import { Link } from 'react-router';
import { useTheme } from '@emotion/react';

const AccessDeniedPage = () => {
  const { weatherCondition } = useWeatherConditionStore();
  const theme = useTheme();
  return (
    <div css={[S.Container, backgroundTheme[weatherCondition]]}>
      <div css={S.Content}>
        <h1 css={S.Title}>접근 제한</h1>
        <p css={S.Message}>해당 기기로는 이 페이지에 접근할 수 없습니다.</p>
        <p css={S.SubMessage}>데스크톱 환경에서 이용해주세요.</p>
        <Link to="/" css={S.LinkButton(theme)}>
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export default AccessDeniedPage;
