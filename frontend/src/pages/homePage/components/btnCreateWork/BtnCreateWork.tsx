import type { ButtonHTMLAttributes } from 'react';
import S from './BtnCreateWork.style';

interface BtnCreateWorkProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

const BtnCreateWork = ({ text, ...props }: BtnCreateWorkProps) => {
  return (
    <button css={S.BtnCreateWork} {...props}>
      {text}
    </button>
  );
};

export default BtnCreateWork;
