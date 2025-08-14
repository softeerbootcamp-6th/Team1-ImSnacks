import { token } from '@/store/token';
const baseUrl = import.meta.env.VITE_API_URL;

const customFetch = async (url: string, options: RequestInit) => {
  if (!baseUrl) {
    throw new Error('Base URL is not defined');
  }

  try {
    const response = await fetch(`${baseUrl}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.get()}`,
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
      const error = await response.text();
      throw new Error(error);
    }

    return response.json();
  } catch (error) {
    console.error(`${options.method} 요청 실패:`, error);
    //TODO: 에러 핸들링
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    alert(errorMessage);
    throw new Error(`Error: ${errorMessage}`);
  }
};

const HTTP = {
  get: (url: string) => customFetch(url, { method: 'GET' }),
  post: <T>(url: string, body: T) =>
    customFetch(url, { method: 'POST', body: JSON.stringify(body) }),
  put: <T>(url: string, body: T) =>
    customFetch(url, { method: 'PUT', body: JSON.stringify(body) }),
  patch: <T>(url: string, body: T) =>
    customFetch(url, { method: 'PATCH', body: JSON.stringify(body) }),
  delete: <T>(url: string, body: T) =>
    customFetch(url, { method: 'DELETE', body: JSON.stringify(body) }),
};

export default HTTP;
