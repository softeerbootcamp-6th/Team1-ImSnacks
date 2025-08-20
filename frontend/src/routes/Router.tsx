import { useRoutes, Outlet } from 'react-router';
import Layout from '@/layouts/Layout';
import { lazy, Suspense } from 'react';

const HomePage = lazy(() => import('@/pages/homePage/HomePage'));
const MyFarmPage = lazy(() => import('@/pages/myFarmPage/MyFarmPage'));
const WeatherBoardPage = lazy(
  () => import('@/pages/weatherBoardPage/WeatherBoardPage')
);
const LoginPage = lazy(() => import('@/pages/loginPage/LoginPage'));

export const Router = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: (
        <Layout>
          <Suspense
            fallback={
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '200px',
                  fontSize: '16px',
                }}
              >
                페이지를 불러오는 중...
              </div>
            }
          >
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
