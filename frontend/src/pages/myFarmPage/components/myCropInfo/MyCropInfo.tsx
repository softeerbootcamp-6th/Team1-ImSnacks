import { CROPS } from '@/constants/crops';
import CropInfoCard from '../cropInfoCard/CropInfoCard';
import MyFarmHeader from '../myFarmHeader/MyFarmHeader';
import S from './MyCropInfo.style';
import { IC24InfoIcon } from '@/assets/icons/flat';
import { TOOLTIP_DIRECTIONS } from '@/types/tooltip.type';

const MyCropInfo = () => {
  const crops = CROPS;
  return (
    <div css={S.MyCropInfoContainer}>
      <MyFarmHeader
        title="내 작물 정보"
        Icon={<IC24InfoIcon width={24} height={24} />}
        toolTipContent={
          <div>{`작물의 현재 생육 단계를\n확인할 수 있습니다`}</div>
        }
        toolTipDirection={TOOLTIP_DIRECTIONS.TOP}
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
