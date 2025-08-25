import {
  BTN_SELECT_CHIP_SIZES,
  BTN_SELECT_CHIP_STATUSES,
} from '@/types/btnSelectChip.type';
import BtnSelectChip from '../btnSelectChip/BtnSelectChip';
import S from './DamageInfoCard.style';
import { ColorStatus } from '@/styles/colors';
import type { MyCropCard } from '@/types/openapiGenerator';

interface DamageInfoCardProps {
  isWeatherVisible: boolean;
  content: string;
  cropList: MyCropCard[];
  selectedPestCrop?: MyCropCard | null;
  setSelectedPestCrop?: (crop: MyCropCard | null) => void;
}

const CaptionIcon = () => {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <circle cx="6" cy="6" r="6" fill={ColorStatus.Global.Red} />
    </svg>
  );
};

const DamageInfoCard = ({
  isWeatherVisible,
  content,
  cropList,
  selectedPestCrop,
  setSelectedPestCrop,
}: DamageInfoCardProps) => {
  return (
    <div css={S.DamageInfoCard}>
      <h2 css={S.DamageInfoCardTitle}>{content}</h2>
      <div css={S.DamagaMyCropsContainer}>
        {isWeatherVisible && <CaptionIcon />}
        {cropList.map(crop => (
          <BtnSelectChip
            key={crop.myCropName}
            text={crop.myCropName ?? ''}
            size={BTN_SELECT_CHIP_SIZES.SMALL}
            status={
              isWeatherVisible
                ? BTN_SELECT_CHIP_STATUSES.DISABLED
                : selectedPestCrop?.myCropId === crop.myCropId
                ? BTN_SELECT_CHIP_STATUSES.PRESSED
                : BTN_SELECT_CHIP_STATUSES.DEFAULT
            }
            onClick={() => {
              setSelectedPestCrop?.(crop);
            }}
          />
        ))}
        {isWeatherVisible && (
          <h2 css={S.DamageInfoCardContent}>에게 주의가 필요해요.</h2>
        )}
      </div>
    </div>
  );
};

export default DamageInfoCard;
