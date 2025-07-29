import NavBar from './navBar/NavBar';
import type { ReactNode } from 'react';
import GlobalStyles from '../styles/GlobalStyles';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <GlobalStyles />
      <NavBar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
