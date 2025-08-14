import { Typography } from '@/styles/typography';
import { useEffect, useState } from 'react';
import DamageInfoCard from '../damageInfoCard/DamageInfoCard';
import DamageCard from '../damageCard/DamageCard';
import DamagePestArrowButton from '../damagePestArrowButton/DamagePestArrowButton';
import { PEST_DAMAGES, WEATHER_DAMAGES } from '@/types/damage.type';
import S from './DamagePests.style';
import { css } from '@emotion/react';
import { getLeft } from '../../utils/damagePestsUtil';
import useVisibility from '@/hooks/useVisibility';
import { useClickOutside } from '@/hooks/handleClickOutside';

const DamagePests = () => {
  const nickName = '밤비';
  const { isVisible, toggle } = useVisibility(true);
  const [title, setTitle] = useState('');
  const [damageInfoCardContent, setDamageInfoCardContent] = useState('');
  const [selectedRiskName, setSelectedRiskName] = useState<string | null>(null);

  const containerRef = useClickOutside<HTMLDivElement>(
    () => setSelectedRiskName(null),
    { enabled: !!selectedRiskName }
  );

  const parentWidth = 866;
  const componentWidth = 342;

  const risk = [
    {
      name: '낙과',
      description: '낙과로 인해 작물에 피해가 발생할 수 있습니다.',
      damageType: WEATHER_DAMAGES.FRUIT_DROP,
    },
    {
      name: '열과',
      description: '열과로 인해 작물의 생장이 저해될 수 있습니다.',
      damageType: WEATHER_DAMAGES.FRUIT_CRAKING,
    },
    {
      name: '햇볕 데임',
      description: '햇볕 데임으로 인해 작물이 얼어버릴 수 있습니다.',
      damageType: WEATHER_DAMAGES.SUNBURN,
    },
  ];

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
    if (isVisible) {
      const WeatherRisk = '폭우';
      setTitle(`${WeatherRisk}에는 특히 이런 피해를 입을 수 있어요.`);
      setDamageInfoCardContent(`${nickName}님의 작물도 주의가 필요해요!`);
    } else {
      setTitle('오늘 날씨에는 이런 병해충을 조심하세요.');
      setDamageInfoCardContent('병해충 정보를 볼 작물을 선택하세요.');
    }
    setSelectedRiskName(null);
  }, [isVisible]);

  const handleCardClick = (name: string) => {
    if (selectedRiskName === name) {
      setSelectedRiskName(null);
    } else {
      setSelectedRiskName(name);
    }
  };

  return (
    <div css={S.DamagePests} ref={containerRef}>
      <div css={Typography.Subtitle_700} style={{ marginBottom: 12 }}>
        {title}
      </div>
      <div css={S.DamagePestsContentWrapper}>
        {isVisible ? (
          <>
            <DamageInfoCard
              isWeatherVisible={isVisible}
              content={damageInfoCardContent}
              cropList={[{ myCropName: '복숭아' }, { myCropName: '포도' }]}
            />
            <div css={S.DamageCardRowWrapper}>
              {risk.map((item, index) => (
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
                    name={item.name}
                    description={item.description}
                    damageType={item.damageType}
                    selectedRiskName={selectedRiskName}
                    onClick={() => handleCardClick(item.name)}
                  />
                </div>
              ))}
            </div>
            <DamagePestArrowButton
              onClick={toggle}
              isWeatherVisible={isVisible}
            />
          </>
        ) : (
          <>
            <DamagePestArrowButton
              onClick={toggle}
              isWeatherVisible={isVisible}
            />
            <DamageInfoCard
              isWeatherVisible={isVisible}
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
                      parentWidth,
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
