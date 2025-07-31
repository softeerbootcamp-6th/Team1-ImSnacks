import type { ButtonHTMLAttributes } from 'react';
import S from './BtnSelectChip.style';

interface BtnSelectChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: 'Small' | 'Large';
  text: string;
  status: 'Default' | 'Pressed' | 'Hover' | 'Disabled';
}

const BtnSelectChip = ({
  size = 'Small',
  text,
  status = 'Default',
  ...props
}: BtnSelectChipProps) => {
  return (
    <button css={S.BtnSelectChip(size, status)} {...props}>
      {text}
    </button>
  );
};

export default BtnSelectChip;
