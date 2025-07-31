const navItems = [
  { title: '홈', path: '/' },
  { title: '날씨 정보', path: '/weather-board' },
  { title: '내 농장', path: '/my-farm' },
  { title: '마이 페이지', path: '/my-page' },
];

import { css } from '@emotion/react';
import S from './NavBar.styles';
import Tab from './tab/Tab';
import { Opacity } from '@/styles/colors';
import Logo from '@/assets/icons/flat/IC24Logo.svg?react';

const NavBar = () => {
  const isWeatherPage = window.location.pathname === '/weather-board';

  return (
    <nav
      css={css`
        ${S.NavBarWrapper}
        ${isWeatherPage && `background: ${Opacity.G800['8o200']};`}
      `}
    >
      <button css={S.LogoStyle}>
        <Logo width={56} height={56} />
      </button>
      <ul css={S.NavBarContent}>
        {navItems.map(item => (
          <Tab
            key={item.path}
            path={item.path}
            label={item.title}
            isActive={window.location.pathname === item.path}
          />
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
