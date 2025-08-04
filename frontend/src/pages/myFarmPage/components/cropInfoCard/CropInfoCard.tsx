import S from './CropInfoCard.style';
import { CROP_ICONS } from '@/constants/cropIcons';
import type { CropNameType } from '@/types/crop.type';
import type { CropInfoCardType } from '@/types/cropInfoCard.type';
import CropGrowthChip from '../cropGrowthChip/CropGrowthChip';

const CropInfoCard = ({ crop }: { crop: CropInfoCardType }) => {
  const CropIconComponent = CROP_ICONS[crop.name as CropNameType];

  return (
    <div css={S.CropInfoCard}>
      <div css={S.CropInfoWrapper}>
        <div css={S.CropIcon}>
          {CropIconComponent && <CropIconComponent width={54} height={54} />}
        </div>
        <div css={S.CropInfo}>
          <div css={S.CropName}>{crop.name}</div>
          <CropGrowthChip
            lifeCycleName={crop.lifeCycleName}
            lifeCycleStep={crop.lifeCycleStep}
          />
        </div>
      </div>

      <div css={S.CropDateWrapper}>
        <div css={S.CropDateDescription}>발아일로부터</div>
        <div css={S.CropDate}>+{crop.duration}일</div>
      </div>
    </div>
  );
};

export default CropInfoCard;
