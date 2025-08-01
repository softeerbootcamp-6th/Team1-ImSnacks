import { CROPS } from '@/constants/crops';
import CropInfoCard from '../cropInfoCard/CropInfoCard';
import InfoIcon from '@/assets/icons/flat/IC24Info.svg?react';
import S from './MyCropInfo.style';

const MyCropInfo = () => {
  const crops = CROPS;
  return (
    <div css={S.MyCropInfoContainer}>
      <div css={S.MyCropInfoHeader}>
        <div>내 작물 정보</div>
        <InfoIcon width={24} height={24} />
      </div>
      <div css={S.CropInfoCardContainer}>
        {crops.map(crop => (
          <CropInfoCard key={crop.id} crop={crop} />
        ))}
      </div>
    </div>
  );
};

export default MyCropInfo;
