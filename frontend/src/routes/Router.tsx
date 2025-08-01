import { useRoutes, Outlet } from 'react-router';
import Layout from '@/layouts/Layout';
import HomePage from '@/pages/homePage/HomePage';

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
          element: <div>Weather Board</div>,
          path: 'weather-board',
        },
        {
          element: <div>My Farm</div>,
          path: 'my-farm',
        },
        {
          element: <div>My Page</div>,
          path: 'my-page',
        },
      ],
    },
  ]);

  return routes;
};
