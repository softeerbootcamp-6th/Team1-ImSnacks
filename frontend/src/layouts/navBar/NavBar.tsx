const NAV_ITEMS = [
  { title: '홈', path: '/' },
  { title: '날씨 정보', path: '/weather-board' },
  { title: '내 농장', path: '/my-farm' },
];

import { Link, useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import S from './NavBar.styles';
import Tab from './tab/Tab';
import { IC24LogoIcon } from '@/assets/icons/flat';

const NavBar = ({ isWeatherPage }: { isWeatherPage: boolean }) => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 스크롤 방향 감지
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // 아래로 스크롤하고 100px 이상 스크롤했을 때 navBar 숨김
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // 위로 스크롤할 때 navBar 표시
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav css={S.NavBarWrapper(isWeatherPage, isVisible)}>
      <Link to="/" css={S.LogoStyle}>
        <IC24LogoIcon width={56} height={56} />
      </Link>
      <ul css={S.NavBarContent}>
        {NAV_ITEMS.map(item => (
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
