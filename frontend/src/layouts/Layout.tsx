import type { ReactNode } from 'react';
import { gradientStyles } from '@/styles/gradientStyles';
import { css } from '@emotion/react';
import NavBar from './navBar/NavBar';
import { useWeatherConditionStore } from '@/store/useWeatherConditionStore';
import { backgroundTheme } from '@/constants/backgroundTheme';
import { useFadeTransition } from '@/hooks/useFadeTransition';
import type { WeatherConditionsType } from '@/types/weather.types';

const Layout = ({ children }: { children: ReactNode }) => {
  const { weatherCondition } = useWeatherConditionStore();
  const isWeatherPage = window.location.pathname === '/weather-board';

  const {
    prev: prevCondition,
    isFading,
    durationMs,
  } = useFadeTransition(weatherCondition, { durationMs: 1000 });

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
      `}
    >
      <div
        aria-hidden
        css={css`
          position: absolute;
          inset: 0;
          ${isWeatherPage
            ? gradientStyles.backgroundWeatherBoard
            : backgroundTheme[weatherCondition]}
        `}
      />
      {!isWeatherPage && prevCondition !== weatherCondition && (
        <div
          aria-hidden
          css={css`
            position: absolute;
            inset: 0;
            ${backgroundTheme[prevCondition as WeatherConditionsType]}
            opacity: ${isFading ? 0 : 1};
            transition: opacity ${durationMs}ms ease-in-out;
            will-change: opacity;
          `}
        />
      )}
      <NavBar isWeatherPage={isWeatherPage} />
      <main
        css={css`
          max-width: 1328px;
          position: relative;
        `}
        // css={css`
        //   width: 100%;
        // `}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
