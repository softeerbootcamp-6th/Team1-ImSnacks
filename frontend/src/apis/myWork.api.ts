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

type PostMyWorkBodyRequest = Omit<
  RegisterMyWorkRequest,
  'startTime' | 'endTime'
> & {
  startTime: string;
  endTime: string;
};

export const postMyWork = (body: PostMyWorkBodyRequest) =>
  HTTP.post<PostMyWorkBodyRequest, RegisterMyWorkResponse>('/myWork', body);
