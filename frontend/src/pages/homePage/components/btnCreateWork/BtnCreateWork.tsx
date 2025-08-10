import type { ButtonHTMLAttributes } from 'react';
import S from './BtnCreateWork.style';

interface BtnCreateWorkProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  isDragging?: boolean;
}

const BtnCreateWork = ({
  text,
  isDragging = false,
  ...props
}: BtnCreateWorkProps) => {
  return (
    <button css={S.BtnCreateWork(isDragging)} {...props}>
      {text}
    </button>
  );
};

export default BtnCreateWork;
