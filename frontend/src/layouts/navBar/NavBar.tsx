const NAVITEMS = [
  { title: '홈', path: '/' },
  { title: '날씨 정보', path: '/weather-board' },
  { title: '내 농장', path: '/my-farm' },
];

import { useLocation } from 'react-router';
import S from './NavBar.styles';
import Tab from './tab/Tab';
import { IC24LogoIcon } from '@/assets/icons/flat';

const NavBar = ({ isWeatherPage }: { isWeatherPage: boolean }) => {
  const location = useLocation();

  return (
    <nav css={S.NavBarWrapper(isWeatherPage)}>
      <button css={S.LogoStyle}>
        <IC24LogoIcon width={56} height={56} />
      </button>
      <ul css={S.NavBarContent}>
        {NAVITEMS.map(item => (
          <Tab
            key={item.path}
            path={item.path}
            label={item.title}
            isActive={location.pathname === item.path}
          />
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
