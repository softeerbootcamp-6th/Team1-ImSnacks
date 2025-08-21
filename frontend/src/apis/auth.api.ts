import HTTP from './http';
import { LoginRequest, LoginResponse } from '@/types/openapiGenerator';

export const postLogin = (body: LoginRequest) =>
  HTTP.post<LoginRequest, LoginResponse>('/auth/login', body);

export const getAuthRefresh = async () => {
  const baseUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(`${baseUrl}/auth/refresh`, {
    method: 'GET',
    credentials: 'include',
  });

  return response.json();
};
