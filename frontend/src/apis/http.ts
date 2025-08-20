import { useTokenStore } from '@/store/useTokenStore';
const baseUrl = import.meta.env.VITE_API_URL;
import type { ApiRes } from './res';
import { ApiError } from './ApiError';
import { getAuthRefresh } from './auth.api';

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
      ...options.headers,
    },
    credentials: 'include',
  });

  if (!response.ok) {
    const errorBody = await response.json();

    // 에러 코드가 '100'으로 시작하는 경우 토큰 갱신 후 재시도
    if (
      errorBody.code &&
      typeof errorBody.code === 'number' &&
      errorBody.code.toString().startsWith('100')
    ) {
      try {
        console.log('Token refresh needed, error code:', errorBody.code);
        const refreshRes = await getAuthRefresh();
        console.log(refreshRes);
        if (refreshRes.code === 200) {
          useTokenStore.setState({ accessToken: refreshRes.data.accessToken });
          // 새로운 토큰으로 기존 요청 재시도
          return customFetch(url, options);
        }
      } catch (error) {
        console.error('Error refreshing token:', error);
        // window.location.href = '/login'; // TODO: 배포 시에는 주석 해제
        // 토큰 갱신 실패 시 원래 에러를 던짐
        throw new ApiError(
          response.status,
          errorBody.code,
          errorBody.msg,
          errorBody.data
        );
      }
    }

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
