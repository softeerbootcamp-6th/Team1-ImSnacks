import HTTP from './http';
import type {
  RegisterMyWorkRequest,
  RegisterMyWorkResponse,
  GetMyWorksOfTodayResponse,
  GetMyWorksOfWeeklyResponse,
  DeleteMyWorkRequest,
  CustomResponseBodyVoid,
  ModifyMyWorkRequest,
  CustomResponseBodyModifyMyWorkResponse,
} from '@/types/openapiGenerator';
import type { ReplaceTimesDateToString } from '@/types/replaceTimesDateToString.type';

export const getMyWorkOfToday = (isMobile: boolean) =>
  HTTP.get<GetMyWorksOfTodayResponse>(
    `/myWork/today?isMobile=${isMobile ? 'true' : 'false'}`
  );

export const getMyWorkOfWeekly = (startDate: string) =>
  HTTP.get<GetMyWorksOfWeeklyResponse[]>(
    `/myWork/weekly?startDate=${startDate}`
  );

export const postMyWork = (
  body: ReplaceTimesDateToString<RegisterMyWorkRequest>
) =>
  HTTP.post<
    ReplaceTimesDateToString<RegisterMyWorkRequest>,
    RegisterMyWorkResponse
  >('/myWork', body);

export const deleteMyWork = (body: DeleteMyWorkRequest) =>
  HTTP.delete<DeleteMyWorkRequest, CustomResponseBodyVoid>('/myWork', body);

export const patchMyWork = (
  body: ReplaceTimesDateToString<ModifyMyWorkRequest> & { myWorkId: number }
) =>
  HTTP.patch<
    ReplaceTimesDateToString<ModifyMyWorkRequest>,
    CustomResponseBodyModifyMyWorkResponse
  >('/myWork', body);
