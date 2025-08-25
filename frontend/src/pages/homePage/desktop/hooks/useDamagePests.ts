import { useEffect, useState } from 'react';
import { getWeatherDamage, getPestDamage } from '@/apis/damage.api';
import type {
  GetWeatherRiskCardListResponse,
  MyCropCard,
  PestCard,
} from '@/types/openapiGenerator';

export const useDamagePests = () => {
  const [weatherRisk, setWeatherRisk] =
    useState<GetWeatherRiskCardListResponse | null>(null);
  const [pestRisks, setPestRisks] = useState<PestCard[] | null>([]);
  const [pestRisksMyCrops, setPestRisksMyCrops] = useState<MyCropCard[] | null>(
    []
  );
  const [selectedPestCrop, setSelectedPestCrop] = useState<MyCropCard | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const weatherRes = await getWeatherDamage();
        setWeatherRisk(weatherRes.data);

        const pestRes = await getPestDamage();
        setPestRisks(pestRes.data.pestRisks ?? null);
        setPestRisksMyCrops(pestRes.data.myCrops ?? null);
        setSelectedPestCrop(pestRes.data.myCrops?.[0] ?? null);
      } catch (error) {
        console.error('피해 정보 조회 실패:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedPestCrop?.myCropId) {
      const fetchPestDamageByCrop = async () => {
        try {
          const res = await getPestDamage(selectedPestCrop.myCropId);
          setPestRisks(res.data.pestRisks ?? null);
        } catch (error) {
          console.error('병해충 조회 실패:', error);
        }
      };
      fetchPestDamageByCrop();
    }
  }, [selectedPestCrop]);

  return {
    weatherRisk,
    pestRisks,
    pestRisksMyCrops,
    selectedPestCrop,
    setSelectedPestCrop,
  };
};
