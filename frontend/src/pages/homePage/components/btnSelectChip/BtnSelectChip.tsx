import type { ButtonHTMLAttributes } from 'react';
import S from './BtnSelectChip.style';
import {
  BTN_SELECT_CHIP_SIZES,
  BTN_SELECT_CHIP_STATUSES,
  type BtnSelectChipSize,
  type BtnSelectChipStatus,
} from '@/types/btnSelectChip.type';

interface BtnSelectChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: BtnSelectChipSize;
  text: string;
  status: BtnSelectChipStatus;
}

const BtnSelectChip = ({
  size = BTN_SELECT_CHIP_SIZES.SMALL,
  text,
  status = BTN_SELECT_CHIP_STATUSES.DEFAULT,
  ...props
}: BtnSelectChipProps) => {
  return (
    <button css={S.BtnSelectChip(size, status)} {...props}>
      {text}
    </button>
  );
};

export default BtnSelectChip;
