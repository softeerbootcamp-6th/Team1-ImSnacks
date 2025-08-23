import { useTokenStore } from '@/store/useTokenStore';
const baseUrl = import.meta.env.VITE_API_URL;
import type { ApiRes } from './res';
import { ApiError } from './ApiError';
import { getAuthRefresh } from './auth.api';

let isRefreshing = false;
let refreshPromise: Promise<ApiRes<{ accessToken: string }>> | null = null;
const requestQueue: Array<() => void> = [];

const processQueue = () => {
  while (requestQueue.length) {
    const next = requestQueue.shift();
    if (next) next();
  }
};

const customFetch = async (url: string, options: RequestInit) => {
  if (!baseUrl) {
    throw new Error('Base URL is not defined');
  }

  if (isRefreshing) {
    await new Promise<void>(resolve => {
      requestQueue.push(resolve);
    });
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
        if (!isRefreshing) {
          isRefreshing = true;
          refreshPromise = getAuthRefresh();
          const refreshRes = await refreshPromise;
          if (refreshRes.code === 200) {
            useTokenStore.setState({
              accessToken: refreshRes.data.accessToken,
            });
            isRefreshing = false;
            refreshPromise = null;
            processQueue(); // 대기 중인 요청 실행

            return customFetch(url, options);
          } else {
            isRefreshing = false;
            refreshPromise = null;
            processQueue();
            throw new Error('Token refresh failed');
          }
        } else if (refreshPromise) {
          await refreshPromise;

          return customFetch(url, options);
        }
      } catch (error) {
        isRefreshing = false;
        refreshPromise = null;
        processQueue();
        window.location.href = '/login'; // TODO 배포: 배포 시에는 주석 해제
        throw error;
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
