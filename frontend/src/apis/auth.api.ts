import HTTP from './http';
import { LoginRequest, LoginResponse } from '@/types/openapiGenerator';

export const postLogin = (body: LoginRequest) =>
  HTTP.post<LoginRequest, LoginResponse>('/auth/login', body);
