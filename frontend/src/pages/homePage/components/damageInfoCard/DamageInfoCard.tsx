import {
  BTN_SELECT_CHIP_SIZES,
  BTN_SELECT_CHIP_STATUSES,
} from '@/types/btnSelectChip.type';
import BtnSelectChip from '../btnSelectChip/BtnSelectChip';
import S from './DamageInfoCard.style';
import { css } from '@emotion/react';
import { Typography } from '@/styles/typography';
import { Assets, ColorStatus } from '@/styles/colors';
import type { MyCropDto } from '@/types/openapiGenerator';

interface DamageInfoCardProps {
  isWeatherVisible: boolean;
  content: string;
  cropList: MyCropDto[];
}

const DamageInfoCard = ({
  isWeatherVisible,
  content,
  cropList,
}: DamageInfoCardProps) => {
  return (
    <div css={S.DamageInfoCard}>
      <h2
        css={css`
          ${Typography.Body_L_700};
          color: ${Assets.Text.Global.Headline};
        `}
      >
        {content}
      </h2>
      <div
        css={css`
          display: flex;
          align-items: center;
          gap: 8px;
        `}
      >
        {isWeatherVisible && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="6" r="6" fill={ColorStatus.Global.Red} />
          </svg>
        )}
        {cropList.map(crop => (
          <BtnSelectChip
            key={crop.myCropName}
            text={crop.myCropName ?? ''}
            size={BTN_SELECT_CHIP_SIZES.SMALL}
            status={
              isWeatherVisible
                ? BTN_SELECT_CHIP_STATUSES.DISABLED
                : BTN_SELECT_CHIP_STATUSES.DEFAULT
            }
          />
        ))}
      </div>
    </div>
  );
};

export default DamageInfoCard;
