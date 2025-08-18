import S from './CropInfoCard.style';
import { CROP_ICONS } from '@/constants/cropIcons';
import type { CropNameType } from '@/types/crop.type';
import CropGrowthChip from '../cropGrowthChip/CropGrowthChip';
import { GetMyCropsResponse } from '@/types/openapiGenerator';

const CropInfoCard = ({ crop }: { crop: GetMyCropsResponse }) => {
  const CropIconComponent = CROP_ICONS[crop.myCropName as CropNameType];

  return (
    <div css={S.CropInfoCard}>
      <div css={S.CropInfoWrapper}>
        <div css={S.CropIcon}>
          {CropIconComponent && <CropIconComponent width={54} height={54} />}
        </div>
        <div css={S.CropInfo}>
          <div css={S.CropName}>{crop.myCropName}</div>
          {/* TODO: step 추가되면 표시 */}
          <CropGrowthChip lifeCycle={crop.lifeCycle || ''} step={1} />
        </div>
      </div>

      <div css={S.CropDateWrapper}>
        <div css={S.CropDateDescription}>발아일로부터</div>
        <div css={S.CropDate}>+{crop.daysFromStartDate}일</div>
      </div>
    </div>
  );
};

export default CropInfoCard;
