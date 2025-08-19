import { useRoutes, Outlet } from 'react-router';
import Layout from '@/layouts/Layout';
import { lazy } from 'react';

export const HomePage = lazy(() => import('@/pages/homePage/HomePage'));
export const MyFarmPage = lazy(() => import('@/pages/myFarmPage/MyFarmPage'));
export const WeatherBoardPage = lazy(
  () => import('@/pages/weatherBoardPage/WeatherBoardPage')
);
export const LoginPage = lazy(() => import('@/pages/loginPage/LoginPage'));

export const Router = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: (
        <Layout>
          <Outlet />
        </Layout>
      ),
      children: [
        {
          element: <HomePage />,
          index: true,
        },
        {
          element: <WeatherBoardPage />,
          path: 'weather-board',
        },
        {
          element: <MyFarmPage />,
          path: 'my-farm',
        },
        {
          element: <LoginPage />,
          path: 'login',
        },
      ],
    },
  ]);

  return routes;
};
