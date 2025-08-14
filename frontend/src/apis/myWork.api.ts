import type { ApiRes } from './res';
import HTTP from './http';

export const getMyWork = async (): Promise<ApiRes> => {
  const res = await HTTP.get('/myWork');
  return res;
};

//TODO: body 타입 정의
export const postMyWork = async (body: unknown): Promise<ApiRes> => {
  const res = await HTTP.post('/myWork', body);
  return res;
};

export const patchMyWork = async (body: unknown): Promise<ApiRes> => {
  const res = await HTTP.patch('/myWork', body);
  return res;
};

export const deleteMyWork = async (body: unknown): Promise<ApiRes> => {
  const res = await HTTP.delete('/myWork', body);
  return res;
};
