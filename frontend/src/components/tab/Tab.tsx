import { css } from '@emotion/react';
import { Link } from 'react-router';
import { Typography } from '@/styles/typography';
import S from './Tab.styles';

const Tab = ({
  path,
  label,
  isActive,
}: {
  path: string;
  label: string;
  isActive: boolean;
}) => {
  return (
    <Link to={path} css={S.LinkStyle}>
      <li
        css={css`
          ${S.TabStyle}
          ${Typography.Body_S_400}
        ${isActive ? S.TabActive : S.TabDefault}
        `}
      >
        {label}
      </li>
    </Link>
  );
};

export default Tab;
