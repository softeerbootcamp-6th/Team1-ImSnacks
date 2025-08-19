import type {
  GetWeatherRiskCardListResponse,
  MyCropCard,
} from '@/types/openapiGenerator';
import { useClickOutside } from '@/hooks/handleClickOutside';
import { useEffect, useState } from 'react';

interface UseDamagePestsUIProps {
  isWeatherRiskVisible: boolean;
  nickName: string | null;
  weatherRisk: GetWeatherRiskCardListResponse | null;
  selectedPestCrop: MyCropCard | null;
}

export const useDamagePestsUI = ({
  isWeatherRiskVisible,
  nickName,
  weatherRisk,
  selectedPestCrop,
}: UseDamagePestsUIProps) => {
  const [title, setTitle] = useState('');
  const [damageInfoCardContent, setDamageInfoCardContent] = useState('');
  const [selectedRiskName, setSelectedRiskName] = useState<string | null>(null);

  const containerRef = useClickOutside<HTMLDivElement>(
    () => setSelectedRiskName(null),
    { enabled: !!selectedRiskName }
  );

  useEffect(() => {
    if (isWeatherRiskVisible && weatherRisk) {
      setTitle(`${weatherRisk?.riskName}에는 특히 이런 피해를 입을 수 있어요.`);
      setDamageInfoCardContent(`${nickName}님의 작물도 주의가 필요해요!`);
    } else {
      setTitle('오늘 날씨에는 이런 병해충을 조심하세요.');
      setDamageInfoCardContent('병해충 정보를 볼 작물을 선택하세요.');
    }
    setSelectedRiskName(null);
  }, [isWeatherRiskVisible, nickName, weatherRisk]);

  useEffect(() => {
    setSelectedRiskName(null);
  }, [selectedPestCrop]);

  const handleCardClick = (name: string) => {
    if (selectedRiskName === name) {
      setSelectedRiskName(null);
    } else {
      setSelectedRiskName(name);
    }
  };
  return {
    handleCardClick,
    title,
    damageInfoCardContent,
    selectedRiskName,
    containerRef,
  };
};
