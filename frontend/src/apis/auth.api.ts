import HTTP from './http';
import { LoginRequest, AuthTokens } from '@/types/openapiGenerator';

export const login = (body: LoginRequest) =>
  HTTP.post<LoginRequest, AuthTokens>('/auth/login', body);
