import { ProtectedRoute } from '@/components/guards/private-guard';
import OverViewPage from '@/features/overview/_components/overview';
import UsersPage from '@/features/user';
import RootLayout from '@/layouts/root-layout';
import { RouteObject } from 'react-router-dom';
import { getDashboardLink, getUserLink } from './router-link';

const privateRoute: RouteObject[] = [
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <RootLayout />,
        children: [
          { path: getDashboardLink(), element: <OverViewPage /> },
          { path: getUserLink(), element: <UsersPage /> },
          // { path: getRoleLink(), element: <RolesPage /> },
        ],
      },
    ],
  },
];

export default privateRoute;
