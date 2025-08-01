import type { ReactNode } from 'react';
import NavBar from './navBar/NavBar';
import { gradientStyles } from '@/styles/gradientStyles';
import { css } from '@emotion/react';

const Layout = ({ children }: { children: ReactNode }) => {
  const isWeatherPage = window.location.pathname === '/weather-board';

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        padding: 0 200px;
        height: 100vh;
        ${isWeatherPage
          ? gradientStyles.backgroundWeatherBoard
          : gradientStyles.backgroundAfternoonClear}
      `}
    >
      <NavBar isWeatherPage={isWeatherPage} />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
