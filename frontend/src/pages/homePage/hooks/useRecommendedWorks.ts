import { useEffect, useState } from 'react';
import type {
  MyCropResponse,
  RecommendedWorksResponse,
} from '@/types/openapiGenerator';
import { getRecommendedWorks } from '@/apis/work.api';

interface UseRecommendedWorksReturn {
  recommendedWorks: RecommendedWorksResponse[];
  myCrops: MyCropResponse[];
  selectedCrop: MyCropResponse | null;
  handleCropClick: (crop: MyCropResponse) => void;
}

export const useRecommendedWorks = (): UseRecommendedWorksReturn => {
  const [recommendedWorks, setRecommendedWorks] = useState<
    RecommendedWorksResponse[]
  >([]);
  const [myCrops, setMyCrops] = useState<MyCropResponse[]>([]);
  const [selectedCrop, setSelectedCrop] = useState<MyCropResponse | null>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const res = await getRecommendedWorks();
        const initialMyCrops = res.data.myCrops || [];
        const initialRecommendedWorks = res.data.recommendedWorks || [];

        setMyCrops(initialMyCrops);
        setRecommendedWorks(initialRecommendedWorks);

        if (initialMyCrops.length > 0) {
          setSelectedCrop(initialMyCrops[0]);
        }
      } catch (error) {
        console.error('초기 데이터 로드 실패:', error);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    if (!selectedCrop) return;

    const fetchRecommendedWorks = async () => {
      try {
        const res = await getRecommendedWorks(selectedCrop.myCropId);
        setRecommendedWorks(res.data.recommendedWorks || []);
      } catch (error) {
        console.error('추천 작업 로드 실패:', error);
      }
    };

    fetchRecommendedWorks();
  }, [selectedCrop]);

  const handleCropClick = (crop: MyCropResponse) => {
    setSelectedCrop(crop);
  };

  return {
    recommendedWorks,
    myCrops,
    selectedCrop,
    handleCropClick,
  };
};
