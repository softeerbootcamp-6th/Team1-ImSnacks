import { useState } from 'react';
import { useNavigate } from 'react-router';
import { postLogin } from '@/apis/auth.api';
import { useTokenStore } from '@/store/useTokenStore';
import { useUserStore } from '@/store/useUserStore';
import { ApiError } from '@/apis/shared/ApiError';

interface UseLoginReturn {
  identifier: string;
  password: string;
  isLoading: boolean;
  error: string;
  handleIdentifierChange: (value: string) => void;
  handlePasswordChange: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleTestLogin1: (e: React.FormEvent) => void;
  handleTestLogin2: (e: React.FormEvent) => void;
}

export const useLogin = (): UseLoginReturn => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { setAccessToken } = useTokenStore();

  const handleIdentifierChange = (value: string) => {
    setIdentifier(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleLogin = async (
    loginIdentifier: string,
    loginPassword: string,
    updateState = false
  ) => {
    setError('');
    setIsLoading(true);

    try {
      const res = await postLogin({
        identifier: loginIdentifier,
        password: loginPassword,
      });
      if (res.code === 200) {
        setAccessToken(res.data.accessToken!);
        useUserStore.setState({ nickName: res.data.nickname });

        if (updateState) {
          setIdentifier(loginIdentifier);
          setPassword(loginPassword);
        }

        navigate('/');
      } else {
        setError('아이디 또는 비밀번호가 올바르지 않습니다.');
      }
    } catch (error) {
      if (error instanceof ApiError) {
        setError(error.msg || '로그인 중 오류가 발생했습니다.');
      } else {
        setError('로그인 중 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!identifier) {
      setError('아이디를 입력해주세요.');
      return;
    }

    if (!password) {
      setError('비밀번호를 입력해주세요.');
      return;
    }

    await handleLogin(identifier, password);
  };

  const handleTestLogin1 = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleLogin('user001', 'encodedPw1', true);
  };

  const handleTestLogin2 = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleLogin('user002', 'asdf', true);
  };

  return {
    identifier,
    password,
    isLoading,
    error,
    handleIdentifierChange,
    handlePasswordChange,
    handleSubmit,
    handleTestLogin1,
    handleTestLogin2,
  };
};
