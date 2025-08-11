import { WEATHER_CONDITIONS } from '@/types/weather.types';
import MobileHeader from '../components/mobileHeader/MobileHeader';
import S from './MobileHomePage.style';

const MobileHomePage = () => {
  return (
    <div css={S.MobileHomePage}>
      <MobileHeader
        weatherCondition={WEATHER_CONDITIONS.CLOUDY}
        weatherKeyword="구름 많음"
        temperature={25}
      />
    </div>
  );
};

export default MobileHomePage;
