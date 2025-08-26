import { useIsMobileStore } from '@/store/useIsMobileStore';
import S from './LoginPage.style';
import { useLogin } from './hooks/useLogin';
import { css, useTheme } from '@emotion/react';
import loginLogoUrl from '@/assets/icons/flat/IC24Logo.svg';
import logoTextUrl from '@/assets/images/LogoText.svg';

const LoginPage = () => {
  const {
    identifier,
    password,
    isLoading,
    error,
    handleIdentifierChange,
    handlePasswordChange,
    handleSubmit,
    handleTestLogin,
  } = useLogin();
  const { isMobile } = useIsMobileStore();
  const theme = useTheme();

  return (
    <>
      <div css={S.LoginContainer}>
        <div css={S.LogoWrapper}>
          <img
            src={loginLogoUrl}
            alt="Login Icon"
            width={64}
            css={css`
              margin-right: -8px;
            `}
          />
          <img
            src={logoTextUrl}
            alt="Login Logo"
            width={200}
            css={css`
              margin-right: 16px;
            `}
          />
        </div>
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
                css={S.LoginInput(theme.ColorPrimary.B300)}
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
                css={S.LoginInput(theme.ColorPrimary.B300)}
                required
              />
            </div>

            {error && <div css={S.LoginErrorMessage}>{error}</div>}

            <button
              type="submit"
              disabled={isLoading}
              css={S.LoginSubmitButton(theme.ColorPrimary.B700)}
            >
              {isLoading ? '로그인 중...' : '로그인'}
            </button>
            <button
              type="button"
              disabled={isLoading}
              onClick={() => handleTestLogin('user070', 'encodedPw70')}
              css={S.LoginSubmitButton(theme.ColorPrimary.B700)}
            >
              {isLoading
                ? '로그인 중...'
                : '양재 농부 도시농부의 꿈 계정 로그인'}
            </button>
            <button
              type="button"
              disabled={isLoading}
              onClick={() => handleTestLogin('user067', 'encodedPw67')}
              css={S.LoginSubmitButton(theme.ColorPrimary.B700)}
            >
              {isLoading
                ? '로그인 중...'
                : '이천 농부1 밭두렁 아이돌 계정 로그인'}
            </button>
            <button
              type="button"
              disabled={isLoading}
              onClick={() => handleTestLogin('user068', 'encodedPw68')}
              css={S.LoginSubmitButton(theme.ColorPrimary.B700)}
            >
              {isLoading
                ? '로그인 중...'
                : '이천 농부2 땅의 파수꾼 계정 로그인'}
            </button>
            <button
              type="button"
              disabled={isLoading}
              onClick={() => handleTestLogin('user069', 'encodedPw69')}
              css={S.LoginSubmitButton(theme.ColorPrimary.B700)}
            >
              {isLoading ? '로그인 중...' : '청주 농부 바람의 언덕 계정 로그인'}
            </button>
            <button
              type="button"
              disabled={isLoading}
              onClick={() => handleTestLogin('user001', 'encodedPw1')}
              css={S.LoginSubmitButton(theme.ColorPrimary.B700)}
            >
              {isLoading ? '로그인 중...' : '수원 농부 농부킹 계정 로그인'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
