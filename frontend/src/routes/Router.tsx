import { useRoutes, Outlet } from 'react-router';
import Layout from '@/layouts/Layout';
import { lazy, Suspense } from 'react';
import ProtectedRoute from '@/components/common/ProtectedRoute';
import { CircularSpinner } from '@/components/common/CircularSpinner';

const HomePage = lazy(() => import('@/pages/homePage/HomePage'));
const MyFarmPage = lazy(() => import('@/pages/myFarmPage/MyFarmPage'));
const WeatherBoardPage = lazy(
  () => import('@/pages/weatherBoardPage/WeatherBoardPage')
);
const LoginPage = lazy(() => import('@/pages/loginPage/LoginPage'));
const NotFoundPage = lazy(() => import('@/pages/notFoundPage/NotFoundPage'));

export const Router = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: (
        <Layout>
          <Suspense fallback={<CircularSpinner minHeight={900} />}>
            <Outlet />
          </Suspense>
        </Layout>
      ),
      children: [
        {
          element: <HomePage />,
          index: true,
        },
        {
          element: (
            <ProtectedRoute routePath="weather-board">
              <WeatherBoardPage />
            </ProtectedRoute>
          ),
          path: 'weather-board',
        },
        {
          element: (
            <ProtectedRoute routePath="my-farm">
              <MyFarmPage />
            </ProtectedRoute>
          ),
          path: 'my-farm',
        },
        {
          element: <LoginPage />,
          path: 'login',
        },
        {
          element: <NotFoundPage />,
          path: '*',
        },
      ],
    },
  ]);

  return routes;
};
