import { useRoutes, Outlet } from "react-router";
import Layout from "../layouts/Layout";

export const Router = () => {
    const routes = useRoutes([
        {
            path: "/",
            element: (
                <Layout>
                    <Outlet />
                </Layout>
            ),
            children: [
                {
                    element: <div>Home Page</div>,
                    index: true
                },
                {
                    element: <div>Dash Board</div>,
                    path: "dashboard"
                },
                {
                    element: <div>My Farm</div>,
                    path: "my-farm"
                }
            ]
        }
    ]);

    return routes;
};