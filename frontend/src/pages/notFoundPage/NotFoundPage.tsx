import S from './NotFoundPage.style';
import { Link } from 'react-router';

const NotFoundPage = () => {
  return (
    <div css={S.Container}>
      <div css={S.Content}>
        <h1 css={S.Title}>404</h1>
        <h2 css={S.Subtitle}>페이지를 찾을 수 없습니다</h2>
        <p css={S.Message}>
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
        <Link to="/" css={S.LinkButton}>
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
