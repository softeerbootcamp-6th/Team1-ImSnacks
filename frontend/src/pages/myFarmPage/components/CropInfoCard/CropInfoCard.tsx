import S from './CropInfoCard.style';
import { CropIcon } from '@/constants/cropIcons';
import type { CropInfoCardType } from '@/types/cropInfoCard.type';

const CropInfoCard = ({ crop }: { crop: CropInfoCardType }) => {
  const CropIconComponent = CropIcon[crop.name];

  return (
    <div css={S.CropInfoCard}>
      <div css={S.CropInfoWrapper}>
        <div css={S.CropIcon}>
          {CropIconComponent && <CropIconComponent width={54} height={54} />}
        </div>
        <div css={S.CropInfo}>
          <div css={S.CropName}>{crop.name}</div>
          <div>{crop.lifeCycle}</div>
        </div>
      </div>

      <div css={S.CropDateWrapper}>
        <div css={S.CropDateDescription}>발아일로부터</div>
        <div css={S.CropDate}>+{crop.date}일</div>
      </div>
    </div>
  );
};

export default CropInfoCard;
