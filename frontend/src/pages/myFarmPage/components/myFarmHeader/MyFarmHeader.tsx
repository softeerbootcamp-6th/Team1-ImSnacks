import type { ReactNode } from 'react';
import S from './MyFarmHeader.style';

interface MyFarmHeaderProps {
  title: string;
  Icon?: ReactNode;
}

const MyFarmHeader = ({ title, Icon }: MyFarmHeaderProps) => {
  return (
    <div css={S.MyFarmHeader}>
      <div>{title}</div>
      {Icon}
    </div>
  );
};

export default MyFarmHeader;
