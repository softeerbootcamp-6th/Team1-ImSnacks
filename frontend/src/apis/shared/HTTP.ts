import customFetch from './customFetch';
import type { ApiRes } from './apiRes.type';

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
