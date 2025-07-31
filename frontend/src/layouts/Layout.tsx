import type { ReactNode } from 'react';
import GlobalStyles from '@/styles/GlobalStyles';
import NavBar from './navBar/NavBar';

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
