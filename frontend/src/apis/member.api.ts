import HTTP from './http';
import { GetMyCropsResponse } from '@/types/openapiGenerator';

export const getMyCrop = () =>
  HTTP.get<GetMyCropsResponse[]>('/member/myCrops');
