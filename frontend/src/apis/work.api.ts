import HTTP from './http';
import { RecommendWorksResponse } from '@/types/openapiGenerator';

export const getRecommendedWorks = (myCropId?: number) =>
  HTTP.get<RecommendWorksResponse>(
    `/work/recommendation${myCropId ? `?myCropId=${myCropId}` : ''}`
  );
