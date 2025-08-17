import HTTP from './http';
import type {
  RegisterMyWorkRequest,
  RegisterMyWorkResponse,
  GetMyWorksOfTodayResponse,
  GetMyWorksOfWeeklyResponse,
} from '@/types/openapiGenerator';

export const getMyWorkOfToday = (isMobile: boolean) =>
  HTTP.get<GetMyWorksOfTodayResponse>(
    `/myWork/today?isMobile=${isMobile ? 'true' : 'false'}`
  );

export const getMyWorkOfWeekly = (startDate: string) =>
  HTTP.get<GetMyWorksOfWeeklyResponse[]>(
    `/myWork/weekly?startDate=${startDate}`
  );

export const postMyWork = (body: RegisterMyWorkRequest) =>
  HTTP.post<RegisterMyWorkRequest, RegisterMyWorkResponse>('/myWork', body);
