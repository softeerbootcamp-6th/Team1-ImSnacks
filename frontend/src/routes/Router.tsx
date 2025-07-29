import { useRoutes, Outlet } from 'react-router';
import Layout from '../layouts/Layout';
import HomePage from '../pages/HomePage';

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
          element: <div>Dash Board</div>,
          path: 'dashboard',
        },
        {
          element: <div>My Farm</div>,
          path: 'my-farm',
        },
      ],
    },
  ]);

  return routes;
};
