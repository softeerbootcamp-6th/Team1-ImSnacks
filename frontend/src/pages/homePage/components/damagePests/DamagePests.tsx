import { Typography } from '@/styles/typography';
import { useEffect, useState } from 'react';
import DamageInfoCard from '../damageInfoCard/DamageInfoCard';
import DamageCard from '../damageCard/DamageCard';
import DamagePestArrowButton from '../damagePestArrowButton/DamagePestArrowButton';
import {
  PEST_DAMAGES,
  type PestDamagesType,
  type WeatherDamagesType,
} from '@/types/damage.type';
import S from './DamagePests.style';
import { css } from '@emotion/react';
import { getLeft } from '../../utils/damagePestsUtil';
import useVisibility from '@/hooks/useVisibility';
import { useClickOutside } from '@/hooks/handleClickOutside';
import { useUserStore } from '@/store/useUserStore';
import { getWeatherDamage } from '@/apis/damage.api';
import type { GetWeatherRiskCardListResponse } from '@/types/openapiGenerator';

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
      fetchWeatherDamage();
    } catch (error) {
      console.error('기상 리스크별 피해 목록 조회 실패:', error);
    }
  }, []);

  const pestRisks = [
    {
      name: '진딧물',
      damageType: PEST_DAMAGES.GERMS,
      description: '진딧물로 인해 작물에 피해가 발생할 수 있습니다.',
    },
    {
      name: '총채벌레',
      damageType: PEST_DAMAGES.BUGS,
      description: '총채벌레로 인해 작물의 생장이 저해될 수 있습니다.',
    },
    {
      name: '햇볕 데임',
      damageType: PEST_DAMAGES.GERMS,
      description: '햇볕 데임으로 인해 작물이 얼어버릴 수 있습니다.',
    },
    {
      name: '바보',
      damageType: PEST_DAMAGES.GERMS,
      description: '진딧물로 인해 작물에 피해가 발생할 수 있습니다.',
    },
    {
      name: '밤비',
      damageType: PEST_DAMAGES.BUGS,
      description: '총채벌레로 인해 작물의 생장이 저해될 수 있습니다.',
    },
  ];

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
              cropList={[{ myCropName: '복숭아' }, { myCropName: '포도' }]}
            />
            <div css={S.DamageCardRowWrapper}>
              {pestRisks.map((item, index) => (
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
                      count: pestRisks.length,
                    })}px;
                    z-index: ${selectedRiskName === item.name
                      ? 999
                      : index + 1};
                  `}
                >
                  <DamageCard
                    name={item.name}
                    description={item.description}
                    damageType={item.damageType}
                    selectedRiskName={selectedRiskName}
                    onClick={() => handleCardClick(item.name)}
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
