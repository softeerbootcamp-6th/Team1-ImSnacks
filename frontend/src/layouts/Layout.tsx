import type { ReactNode } from 'react';
import { gradientStyles } from '@/styles/gradientStyles';
import { css } from '@emotion/react';

const Layout = ({ children }: { children: ReactNode }) => {
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
          : gradientStyles.backgroundAfternoonClear}
      `}
    >
      {/* <NavBar isWeatherPage={isWeatherPage} /> */}
      <main
      // css={css`
      //   max-width: 1328px;
      // `}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
