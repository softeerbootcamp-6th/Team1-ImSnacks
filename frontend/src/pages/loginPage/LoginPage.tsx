import { useIsMobileStore } from '@/store/useIsMobileStore';
import S from './LoginPage.style';
import { useLogin } from './hooks/useLogin';

const LoginPage = () => {
  const {
    identifier,
    password,
    isLoading,
    error,
    handleIdentifierChange,
    handlePasswordChange,
    handleSubmit,
  } = useLogin();
  const { isMobile } = useIsMobileStore();

  return (
    <>
      <div css={S.LoginContainer}>
        <div css={S.LoginCard(isMobile)}>
          <div css={S.LoginHeader}>
            <h1 css={S.LoginTitle}>로그인</h1>
          </div>

          <form css={S.LoginForm} onSubmit={handleSubmit}>
            <div css={S.LoginInputGroup}>
              <label css={S.LoginLabel} htmlFor="identifier">
                아이디
              </label>
              <input
                id="identifier"
                type="text"
                value={identifier}
                onChange={e => handleIdentifierChange(e.target.value)}
                placeholder="아이디를 입력하세요"
                css={S.LoginInput}
                required
              />
            </div>

            <div css={S.LoginInputGroup}>
              <label css={S.LoginLabel} htmlFor="password">
                비밀번호
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => handlePasswordChange(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                css={S.LoginInput}
                required
              />
            </div>

            {error && <div css={S.LoginErrorMessage}>{error}</div>}

            <button
              type="submit"
              disabled={isLoading}
              css={S.LoginSubmitButton}
            >
              {isLoading ? '로그인 중...' : '로그인'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
