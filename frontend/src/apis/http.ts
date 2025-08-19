import { useTokenStore } from '@/store/useTokenStore';
const baseUrl = import.meta.env.VITE_API_URL;
import type { ApiRes } from './res';
import { ApiError } from './ApiError';

const customFetch = async (url: string, options: RequestInit) => {
  if (!baseUrl) {
    throw new Error('Base URL is not defined');
  }

  const accessToken = useTokenStore.getState().accessToken;

  const response = await fetch(`${baseUrl}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      ...options.headers, // 사용자가 전달한 헤더가 있다면 우선 적용
    },
  });

  // 401 에러 발생 시 로그인 페이지로 리다이렉트
  if (response.status === 401) {
    alert('401 에러 발생');
    window.location.href = '/login';
  }

  if (response.status === 403) {
    alert('403 에러 발생');
    //TODO: 403 에러 발생 시 refresh token 을 이용해 새로운 access token 을 발급받고 다시 요청
  }

  if (!response.ok) {
    const errorBody = await response.json();
    throw new ApiError(
      response.status,
      errorBody.code,
      errorBody.msg,
      errorBody.data
    );
  }

  return response.json();
};

const HTTP = {
  get: <TResponse>(url: string): Promise<ApiRes<TResponse>> =>
    customFetch(url, { method: 'GET' }),
  post: <TRequest, TResponse>(
    url: string,
    body: TRequest
  ): Promise<ApiRes<TResponse>> =>
    customFetch(url, { method: 'POST', body: JSON.stringify(body) }),
  put: <TRequest, TResponse>(
    url: string,
    body: TRequest
  ): Promise<ApiRes<TResponse>> =>
    customFetch(url, { method: 'PUT', body: JSON.stringify(body) }),
  patch: <TRequest, TResponse>(
    url: string,
    body: TRequest
  ): Promise<ApiRes<TResponse>> =>
    customFetch(url, { method: 'PATCH', body: JSON.stringify(body) }),
  delete: <TRequest, TResponse>(
    url: string,
    body: TRequest
  ): Promise<ApiRes<TResponse>> =>
    customFetch(url, { method: 'DELETE', body: JSON.stringify(body) }),
};

export default HTTP;
