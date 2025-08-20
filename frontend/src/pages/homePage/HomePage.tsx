import { useIsMobileStore } from '@/store/useIsMobileStore';
import DesktopHomePage from './desktop/DesktopHomePage';
import MobileHomePage from './mobile/MobileHomePage';

const HomePage = () => {
  const { isMobile } = useIsMobileStore();
  return isMobile ? <MobileHomePage /> : <DesktopHomePage />;
};

export default HomePage;
