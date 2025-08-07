import { css } from '@emotion/react';
import S from './WeatherBoardPage.style';
import WeatherBoardTemparature from './components/weatherBoardTemperature/WeatherBoardTemparature';
import WeatherBoardWeekly from './components/weatherBoardWeekly/WeatherBoardWeekly';
import WeatherBoardRain from './components/weatherBoardRain/WeatherBoardRain';
import WeatherBoardHumidity from './components/weatherBoardHumidity/WeatherBoardHumidity';
import WeatherBoardWind from './components/weatherBoardWind/WeatherBoardWind';
import WeatherBoardUV from './components/weatherBoardUV/WeatherBoardUV';
import WeatherBoardDust from './components/weatherBoardDust/WeatherBoardDust';
import WeatherBoardSunset from './components/weatherBoardSunset/WeatherBoardSunset';
import { FlexStyles } from '@/styles/commonStyles';

const WeatherBoardPage = () => {
  const address = '충북 영동군 황간면 우천1길 50-42';
  return (
    <div css={S.WeatherBoardPage}>
      <div
        css={css`
          width: 100%;
          text-align: start;
          margin-bottom: 4px;
        `}
      >
        <p css={S.MyFarmAddress}>{address}</p>
      </div>

      <div
        css={css`
          ${FlexStyles.flexColumn};
          ${S.WeatherBoardContent};
        `}
      >
        <div
          css={css`
            ${FlexStyles.flexRow};
            justify-content: space-between;
            width: 100%;
            height: 588px;
          `}
        >
          <div
            css={css`
              width: 990px;
              ${FlexStyles.flexColumn};
              gap: 24px;
            `}
          >
            <div
              css={css`
                width: 100%;
                height: 280px;
              `}
            >
              <WeatherBoardTemparature />
            </div>
            <div
              css={css`
                ${FlexStyles.flexRow};
                justify-content: space-between;
                height: 284px;
                ${S.WeatherBoardContent}
              `}
            >
              <WeatherBoardRain />
              <WeatherBoardHumidity />
              <WeatherBoardWind />
            </div>
          </div>
          <div
            css={css`
              width: 314px;
              height: 100%;
            `}
          >
            <WeatherBoardWeekly />
          </div>
        </div>
        <div
          css={css`
            ${FlexStyles.flexRow};
            justify-content: space-between;
            height: 205px;
            ${S.WeatherBoardContent}
          `}
        >
          <WeatherBoardUV />
          <WeatherBoardDust />
          <WeatherBoardSunset />
        </div>
      </div>
    </div>
  );
};

export default WeatherBoardPage;
