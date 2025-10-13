import { createBrowserRouter } from 'react-router-dom';

import { AppLayout } from '@/presentations/layouts';
import { HomePage, LoginPage, NotFoundPage } from '@/presentations/pages';

import { ProtectedRoute, RouteErrorBoundary } from './components';

/** ルートパスの定義 */
const ROUTE_PATH = {
  HOME: '/',
  LOGIN: '/login',
};

export const routes = [
  {
    path: ROUTE_PATH.HOME,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        path: ROUTE_PATH.LOGIN,
        lazy: async () => ({
          Component: LoginPage,
        }),
      },
      {
        path: '/',
        lazy: async () => ({
          Component: () => (
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          ),
        }),
        children: [
          {
            index: true,
            lazy: async () => ({ Component: HomePage }),
          },
        ],
      },
      // 404 ページ - 全てのルートにマッチしなかった場合
      {
        path: '*',
        lazy: async () => ({ Component: NotFoundPage }),
      },
    ],
  },
];

export const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
});
