import { Link, useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import S from './NavBar.styles';
import Tab from '../../components/tab/Tab';
import { IC24LogoIcon } from '@/assets/icons/flat';
import { NAV_ITEMS } from '@/constants/menuItems';
import useThrottle from '@/hooks/useThrottle';

const NavBar = ({ isWeatherPage }: { isWeatherPage: boolean }) => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = useThrottle(() => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      // 아래로 스크롤하고 100px 이상 스크롤했을 때 navBar 숨김
      setIsVisible(false);
    } else if (currentScrollY < lastScrollY) {
      setIsVisible(true);
    }

    setLastScrollY(currentScrollY);
  }, 16);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

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
