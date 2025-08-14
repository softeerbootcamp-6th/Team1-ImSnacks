import { useRoutes, Outlet } from 'react-router';
import Layout from '@/layouts/Layout';
import HomePage from '@/pages/homePage/HomePage';
import MyFarmPage from '@/pages/myFarmPage/MyFarmPage';
import WeatherBoardPage from '@/pages/weatherBoardPage/WeatherBoardPage';
import LoginPage from '@/pages/loginPage/LoginPage';

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
          element: <div>My Page</div>,
          path: 'my-page',
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
