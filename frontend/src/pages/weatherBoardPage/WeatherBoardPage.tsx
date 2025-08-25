import { css } from '@emotion/react';
import S from './WeatherBoardPage.style';
import WeatherBoardTemperature from './components/weatherBoardTemperature/WeatherBoardTemperature';
import WeatherBoardWeekly from './components/weatherBoardWeekly/WeatherBoardWeekly';
import WeatherBoardPrecipitation from './components/weatherBoardPrecipitation/WeatherBoardPrecipitation';
import WeatherBoardHumidity from './components/weatherBoardHumidity/WeatherBoardHumidity';
import WeatherBoardWind from './components/weatherBoardWind/WeatherBoardWind';
import WeatherBoardUV from './components/weatherBoardUV/WeatherBoardUV';
import WeatherBoardDust from './components/weatherBoardDust/WeatherBoardDust';
import WeatherBoardSunset from './components/weatherBoardSunset/WeatherBoardSunset';
import { FlexStyles } from '@/styles/commonStyles';
import { useEffect, useState } from 'react';
import { getMemberAddress } from '@/apis/member.api';
import { useIsMobileStore } from '@/store/useIsMobileStore';

const WeatherBoardPage = () => {
  const { isMobile } = useIsMobileStore();
  const [address, setAddress] = useState<string>('');

  const fetchAddress = async () => {
    try {
      const res = await getMemberAddress();
      if (res.data) {
        setAddress(res.data.address ?? '');
      }
    } catch (error) {
      console.error('주소를 가져오는 데 실패했습니다:', error);
    }
  };

  useEffect(() => {
    if (!isMobile) {
      fetchAddress();
    }
  }, [isMobile]);

  return (
    <div css={S.WeatherBoardPage}>
      <div css={S.MyFarmAddressWrapper}>
        <p css={S.MyFarmAddress}>{address}</p>
      </div>

      <div
        css={css`
          ${FlexStyles.flexColumn};
          ${S.WeatherBoardContent};
        `}
      >
        <div css={S.WeatherBoardFirRow}>
          <div
            css={css`
              width: 990px;
              ${FlexStyles.flexColumn};
              gap: 24px;
            `}
          >
            <div css={S.WeatherBoardTemperatureWrapper}>
              <WeatherBoardTemperature />
            </div>
            <div css={S.WeatherBoardSecRow}>
              <WeatherBoardPrecipitation />
              <WeatherBoardHumidity />
              <WeatherBoardWind />
            </div>
          </div>
          <div css={S.WeatherBoardWeeklyWrapper}>
            <WeatherBoardWeekly />
          </div>
        </div>
        <div css={S.WeatherBoardThirdRow}>
          <WeatherBoardUV />
          <WeatherBoardDust />
          <WeatherBoardSunset />
        </div>
      </div>
    </div>
  );
};

export default WeatherBoardPage;
