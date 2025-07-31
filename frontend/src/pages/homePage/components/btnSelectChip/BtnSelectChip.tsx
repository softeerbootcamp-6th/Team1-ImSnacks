import type { ButtonHTMLAttributes } from 'react';
import S from './BtnSelectChip.style';

interface BtnSelectChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: 'Small' | 'Large';
  text: string;
}

const BtnSelectChip = ({
  size = 'Small',
  text,
  ...props
}: BtnSelectChipProps) => {
  return (
    <button css={S.BtnSelectChipStyle(size)} {...props}>
      {text}
    </button>
  );
};

export default BtnSelectChip;
