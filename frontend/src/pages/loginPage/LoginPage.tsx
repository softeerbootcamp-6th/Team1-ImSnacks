import { useState } from 'react';
import { useNavigate } from 'react-router';
import { postLogin } from '@/apis/auth.api';
import { token } from '@/store/token';
import S from './LoginPage.style';

const LoginPage = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await postLogin({ identifier, password });
      if (res.code === 200) {
        token.set(res.data.accessToken!);
        navigate('/');
      } else {
        setError('이메일 또는 비밀번호가 올바르지 않습니다.');
      }
    } catch {
      setError('로그인 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div css={S.LoginContainer}>
        <div css={S.LoginCard}>
          <div css={S.LoginHeader}>
            <h1 css={S.LoginTitle}>로그인</h1>
          </div>

          <form css={S.LoginForm} onSubmit={handleSubmit}>
            <div css={S.LoginInputGroup}>
              <label css={S.LoginLabel} htmlFor="identifier">
                이메일
              </label>
              <input
                id="identifier"
                type="text"
                value={identifier}
                onChange={e => setIdentifier(e.target.value)}
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
                onChange={e => setPassword(e.target.value)}
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
