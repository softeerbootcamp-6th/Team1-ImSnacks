import type { ApiRes } from './res';
import HTTP from './http';
import type {
  RegisterMyWorkRequest,
  RegisterMyWorkResponse,
  GetMyWorksOfTodayResponse,
} from '@/types/openapiGenerator';

export const getMyWork = () => HTTP.get<GetMyWorksOfTodayResponse>('/myWork');

export const postMyWork = (body: RegisterMyWorkRequest) =>
  HTTP.post<RegisterMyWorkRequest, RegisterMyWorkResponse>('/myWork', body);

export const patchMyWork = async (body: unknown): Promise<ApiRes> => {
  const res = await HTTP.patch('/myWork', body);
  return res;
};

export const deleteMyWork = async (body: unknown): Promise<ApiRes> => {
  const res = await HTTP.delete('/myWork', body);
  return res;
};
