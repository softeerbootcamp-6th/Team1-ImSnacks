import { CROPS } from '@/constants/crops';
import CropInfoCard from '../cropInfoCard/CropInfoCard';
import MyFarmHeader from '../myFarmHeader/MyFarmHeader';
import S from './MyCropInfo.style';
import InfoIcon from '@/assets/icons/flat/IC24Info.svg?react';

const MyCropInfo = () => {
  const crops = CROPS;
  return (
    <div css={S.MyCropInfoContainer}>
      <MyFarmHeader
        title="내 작물 정보"
        Icon={<InfoIcon width={24} height={24} />}
        toolTipContent={<div>작물의 현재 생육 단계를 확인할 수 있습니다</div>}
      />
      <div css={S.CropInfoCardContainer}>
        {crops.map(crop => (
          <CropInfoCard key={crop.id} crop={crop} />
        ))}
      </div>
    </div>
  );
};

export default MyCropInfo;
