import type { GetMemberAddressResponse } from '@/types/openapiGenerator';
import HTTP from './http';

export const getMemberAddress = () =>
  HTTP.get<GetMemberAddressResponse>('/member/address');
