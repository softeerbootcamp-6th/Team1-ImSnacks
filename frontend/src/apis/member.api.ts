import type {
  GetMemberAddressResponse,
  GetMyCropsResponse,
} from '@/types/openapiGenerator';
import HTTP from './shared/HTTP';

export const getMemberAddress = () =>
  HTTP.get<GetMemberAddressResponse>('/member/address');

export const getMyCrop = () =>
  HTTP.get<GetMyCropsResponse[]>('/member/myCrops');
