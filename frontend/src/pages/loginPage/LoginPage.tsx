import { useState } from 'react';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router';
import { GrayScale, ColorPrimary, ColorStatus } from '@/styles/colors';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // TODO: 실제 로그인 API 호출
      // const response = await HTTP.post('/auth/login', { email, password });

      // 임시 로그인 로직 (실제 구현 시 제거)
      if (email === 'test@example.com' && password === 'password') {
        // 로그인 성공 시 홈페이지로 이동
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
      <div css={S.Container}>
        <div css={S.LoginCard}>
          <div css={S.Header}>
            <h1 css={S.Title}>로그인</h1>
          </div>

          <form css={S.Form} onSubmit={handleSubmit}>
            <div css={S.InputGroup}>
              <label css={S.Label} htmlFor="email">
                이메일
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="이메일을 입력하세요"
                css={S.Input}
                required
              />
            </div>

            <div css={S.InputGroup}>
              <label css={S.Label} htmlFor="password">
                비밀번호
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                css={S.Input}
                required
              />
            </div>

            {error && <div css={S.ErrorMessage}>{error}</div>}

            <button type="submit" disabled={isLoading} css={S.LoginButton}>
              {isLoading ? '로그인 중...' : '로그인'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

const S = {
  Container: css`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  `,

  LoginCard: css`
    background: white;
    border-radius: 16px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    padding: 20px;
    width: 400px;
    box-sizing: border-box;
    overflow: hidden;
  `,

  Header: css`
    text-align: center;
    margin-bottom: 32px;
  `,

  Title: css`
    font-size: 28px;
    font-weight: 700;
    color: ${GrayScale.G900};
    margin: 0 0 8px 0;
  `,

  Form: css`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
  `,

  InputGroup: css`
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    min-width: 0;
  `,

  Label: css`
    font-size: 14px;
    font-weight: 600;
    color: ${GrayScale.G800};
  `,

  Input: css`
    width: 100%;
    box-sizing: border-box;
    padding: 12px 16px;
    border: 2px solid ${GrayScale.G200};
    border-radius: 8px;
    font-size: 16px;
    transition: border-color 0.2s ease;

    &:focus {
      outline: none;
      border-color: ${ColorPrimary.B500};
    }

    &::placeholder {
      color: ${GrayScale.G400};
    }
  `,

  ErrorMessage: css`
    color: ${ColorStatus.Global.Red};
    font-size: 14px;
    text-align: center;
    padding: 8px;
    border-radius: 6px;
  `,

  LoginButton: css`
    background: ${ColorPrimary.B400};
    color: white;
    border: none;
    border-radius: 8px;
    padding: 14px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }
  `,
};

export default LoginPage;
