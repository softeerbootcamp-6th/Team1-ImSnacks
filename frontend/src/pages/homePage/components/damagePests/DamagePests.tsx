import { Typography } from '@/styles/typography';
import { useEffect, useState } from 'react';
import DamageInfoCard from '../damageInfoCard/DamageInfoCard';
import DamageCard from '../damageCard/DamageCard';
import DamagePestArrowButton from '../damagePestArrowButton/DamagePestArrowButton';
import {
  type PestDamagesType,
  type WeatherDamagesType,
} from '@/types/damage.type';
import S from './DamagePests.style';
import { css } from '@emotion/react';
import { getLeft } from '../../utils/damagePestsUtil';
import useVisibility from '@/hooks/useVisibility';
import { useClickOutside } from '@/hooks/handleClickOutside';
import { useUserStore } from '@/store/useUserStore';
import { getPestDamage, getWeatherDamage } from '@/apis/damage.api';
import type {
  GetWeatherRiskCardListResponse,
  MyCropCard,
  PestCard,
} from '@/types/openapiGenerator';

const DamagePests = () => {
  const { nickName } = useUserStore();
  const {
    isVisible: isWeatherRiskVisible,
    show: showWeatherRiskVisible,
    hide: hideWeatherRiskVisible,
  } = useVisibility(true);

  const [title, setTitle] = useState('');
  const [damageInfoCardContent, setDamageInfoCardContent] = useState('');
  const [selectedRiskName, setSelectedRiskName] = useState<string | null>(null);

  const [weatherRisk, setWeatherRisk] =
    useState<GetWeatherRiskCardListResponse | null>(null);
  const [pestRisks, setPestRisks] = useState<PestCard[] | null>([]);
  const [pestRisksMyCrops, setPestRisksMyCrops] = useState<MyCropCard[] | null>(
    []
  );

  const [selectedPestCrop, setSelectedPestCrop] = useState<MyCropCard | null>(
    null
  );

  const containerRef = useClickOutside<HTMLDivElement>(
    () => setSelectedRiskName(null),
    { enabled: !!selectedRiskName }
  );

  const parentWidth = 866;
  const pestOnlyParentWidth = 966;

  const componentWidth = 342;

  useEffect(() => {
    try {
      const fetchWeatherDamage = async () => {
        const res = await getWeatherDamage();
        setWeatherRisk(res.data);
      };
      const fetchPestDamage = async () => {
        const res = await getPestDamage();
        setPestRisks(res.data.pestRisks ?? null);
        setPestRisksMyCrops(res.data.myCrops ?? null);
        setSelectedPestCrop(res.data.myCrops?.[0] ?? null);

        console.log(res.data);
      };
      fetchWeatherDamage();
      fetchPestDamage();
    } catch (error) {
      console.error('기상 리스크별 피해 목록 조회 실패:', error);
    }
  }, []);

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
    if (selectedPestCrop?.myCropId) {
      const fetchPestDamage = async () => {
        const res = await getPestDamage(selectedPestCrop.myCropId);
        setPestRisks(res.data.pestRisks ?? null);
      };
      fetchPestDamage();
    }
  }, [selectedPestCrop]);

  const handleCardClick = (name: string) => {
    if (selectedRiskName === name) {
      setSelectedRiskName(null);
    } else {
      setSelectedRiskName(name);
    }
  };

  return (
    <div css={S.DamagePests} ref={containerRef}>
      <div
        css={css`
          ${Typography.Subtitle_700};
          margin-bottom: 12px;
        `}
      >
        {title}
      </div>
      <div css={S.DamagePestsContentWrapper}>
        {weatherRisk && isWeatherRiskVisible ? (
          <>
            <DamageInfoCard
              isWeatherVisible={isWeatherRiskVisible}
              content={damageInfoCardContent}
              cropList={weatherRisk?.myCropList ?? []}
            />
            <div css={S.DamageCardRowWrapper}>
              {weatherRisk?.risks?.map((item, index) => (
                <div
                  key={item.name}
                  css={css`
                    position: absolute;
                    top: 0;
                    left: ${index * 262}px;
                    z-index: ${selectedRiskName === item.name
                      ? 999
                      : index + 1};
                  `}
                >
                  <DamageCard
                    name={item.name ?? ''}
                    description={item.description ?? ''}
                    damageType={
                      item.damageType as WeatherDamagesType | PestDamagesType
                    }
                    selectedRiskName={selectedRiskName}
                    onClick={() => handleCardClick(item.name ?? '')}
                  />
                </div>
              ))}
            </div>
            <DamagePestArrowButton
              onClick={hideWeatherRiskVisible}
              isWeatherVisible={isWeatherRiskVisible}
            />
          </>
        ) : (
          <>
            {weatherRisk && (
              <DamagePestArrowButton
                onClick={showWeatherRiskVisible}
                isWeatherVisible={isWeatherRiskVisible}
              />
            )}
            <DamageInfoCard
              isWeatherVisible={isWeatherRiskVisible}
              content={damageInfoCardContent}
              cropList={pestRisksMyCrops ?? []}
              selectedPestCrop={selectedPestCrop}
              setSelectedPestCrop={setSelectedPestCrop}
            />
            <div css={S.DamageCardRowWrapper}>
              {pestRisks?.map((item, index) => (
                <div
                  key={item.name}
                  css={css`
                    position: absolute;
                    top: 0;
                    left: ${getLeft({
                      parentWidth: weatherRisk
                        ? parentWidth
                        : pestOnlyParentWidth,
                      componentWidth,
                      index,
                      count: pestRisks?.length ?? 0,
                    })}px;
                    z-index: ${selectedRiskName === item.name
                      ? 999
                      : index + 1};
                  `}
                >
                  <DamageCard
                    name={item.name ?? ''}
                    description={item.description ?? ''}
                    damageType={
                      item.damageType as WeatherDamagesType | PestDamagesType
                    }
                    selectedRiskName={selectedRiskName}
                    onClick={() => handleCardClick(item.name ?? '')}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DamagePests;
