import HTTP from './http';
import { RecommendedWorksResponse } from '@/types/openapiGenerator';

export const getRecommendedWorks = () =>
  HTTP.get<RecommendedWorksResponse>('/works/recommenation');
