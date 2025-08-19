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
      // Authorization: accessToken
      //   ? `Bearer ${accessToken}`
      //   : 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaXNzIjoibnllb3JldW1uYWdpIiwiaWF0IjoxNzU1NTc0NDAyLCJleHAiOjE3NTU5MzQ0MDJ9.x4UVYiyZ3pUI48QY7JVgIFIkvEOREuEUTv4N7y7xMJE',
      ...options.headers, // 사용자가 전달한 헤더가 있다면 우선 적용
    },
  });

  // if (response.status === 400) {
  //   //TODO: 400 에러 발생 시 refresh token 을 이용해 새로운 access token 을 발급받고 다시 요청
  //   try {
  //     console.error('refreshing...', response);
  //     // reissue
  //     // if(response.)
  //     const res = await getAuthRefresh();
  //     if (res.code === 200) {
  //       useTokenStore.setState({ accessToken: res.data.accessToken });

  //       return customFetch(url, options);
  //     }
  //   } catch (error) {
  //     console.error('Error refreshing token:', error);
  //     // window.location.href = '/login';
  //   }
  // }
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
        // 토큰 갱신 실패 시 원래 에러를 던짐
        // window.location.href = '/login';
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
