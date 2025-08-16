import { useState } from 'react';
import { useNavigate } from 'react-router';
import { postLogin } from '@/apis/auth.api';
import { token } from '@/store/token';
import { useUserStore } from '@/store/useUserStore';
import { ApiError } from '@/apis/ApiError';

interface UseLoginReturn {
  identifier: string;
  password: string;
  isLoading: boolean;
  error: string;
  handleIdentifierChange: (value: string) => void;
  handlePasswordChange: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

export const useLogin = (): UseLoginReturn => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleIdentifierChange = (value: string) => {
    setIdentifier(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!identifier) {
      setError('아이디를 입력해주세요.');
      setIsLoading(false);
      return;
    }

    if (!password) {
      setError('비밀번호를 입력해주세요.');
      setIsLoading(false);
      return;
    }

    try {
      const res = await postLogin({ identifier, password });
      if (res.code === 200) {
        token.set(res.data.accessToken!);
        useUserStore.setState({ nickName: res.data.nickname });
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

  return {
    identifier,
    password,
    isLoading,
    error,
    handleIdentifierChange,
    handlePasswordChange,
    handleSubmit,
  };
};
