import { useIsMobileStore } from '@/store/useIsMobileStore';
import { lazy } from 'react';

const AccessDeniedPage = lazy(
  () => import('@/pages/accessDeniedPage/AccessDeniedPage')
);

// 모바일에서 접근 제한할 페이지들
const DESKTOP_ONLY_ROUTES = ['weather-board', 'my-farm'];

interface ProtectedRouteProps {
  children: React.ReactNode;
  routePath: string;
}

const ProtectedRoute = ({ children, routePath }: ProtectedRouteProps) => {
  const { isMobile } = useIsMobileStore();

  if (isMobile && DESKTOP_ONLY_ROUTES.includes(routePath)) {
    return <AccessDeniedPage />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
