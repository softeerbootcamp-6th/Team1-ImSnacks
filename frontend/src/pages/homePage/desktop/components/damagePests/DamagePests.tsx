import { Typography } from '@/styles/typography';
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
import { useUserStore } from '@/store/useUserStore';
import { useDamagePests } from '../../hooks/useDamagePests';
import { useDamagePestsUI } from '../../hooks/useDamagePestsUI';

const DamagePests = () => {
  const { nickName } = useUserStore();
  const {
    isVisible: isWeatherRiskVisible,
    show: showWeatherRiskVisible,
    hide: hideWeatherRiskVisible,
  } = useVisibility(true);

  const {
    weatherRisk,
    pestRisks,
    pestRisksMyCrops,
    selectedPestCrop,
    setSelectedPestCrop,
  } = useDamagePests();

  const parentWidth = 866;
  const pestOnlyParentWidth = 966;

  const componentWidth = 342;

  const {
    handleCardClick,
    title,
    damageInfoCardContent,
    selectedRiskName,
    containerRef,
  } = useDamagePestsUI({
    isWeatherRiskVisible,
    nickName,
    weatherRisk,
    selectedPestCrop,
  });

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
                  key={item.pestRiskId}
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
