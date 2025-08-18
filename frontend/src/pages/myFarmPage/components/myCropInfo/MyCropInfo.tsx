import CropInfoCard from '../cropInfoCard/CropInfoCard';
import MyFarmHeader from '../myFarmHeader/MyFarmHeader';
import S from './MyCropInfo.style';
import { IC24InfoIcon } from '@/assets/icons/flat';
import { TOOLTIP_DIRECTIONS } from '@/types/tooltip.type';
import { useEffect, useState } from 'react';
import { getMyCrop } from '@/apis/member.api';
import { GetMyCropsResponse } from '@/types/openapiGenerator';

const MyCropInfo = () => {
  const [crops, setCrops] = useState<GetMyCropsResponse[]>([]);

  useEffect(() => {
    const fetchMyCrop = async () => {
      const res = await getMyCrop();
      setCrops(res.data);
    };
    fetchMyCrop();
  }, []);

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
        {crops?.map(crop => (
          <CropInfoCard key={crop.myCropId} crop={crop} />
        ))}
      </div>
    </div>
  );
};

export default MyCropInfo;
