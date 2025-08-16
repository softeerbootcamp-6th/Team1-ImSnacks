import type { ReactNode } from 'react';
import { gradientStyles } from '@/styles/gradientStyles';
import { css } from '@emotion/react';
import NavBar from './navBar/NavBar';
import { useWeatherConditionStore } from '@/store/useWeatherConditionStore';
import { backgroundTheme } from '@/constants/backgroundTheme';

const Layout = ({ children }: { children: ReactNode }) => {
  const { weatherCondition } = useWeatherConditionStore();
  const isWeatherPage = window.location.pathname === '/weather-board';

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        ${isWeatherPage
          ? gradientStyles.backgroundWeatherBoard
          : backgroundTheme[weatherCondition]}
      `}
    >
      <NavBar isWeatherPage={isWeatherPage} />
      <main
        css={css`
          max-width: 1328px;
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
