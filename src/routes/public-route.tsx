import PublicGuard from '@/components/guards/public-guard';
import { LoginPage } from '@/features/auth/page/LoginPage';
import { RouteObject } from 'react-router-dom';
import { getLoginLink } from './router-link';

const publicRoute: RouteObject[] = [
  {
    element: <PublicGuard />,
    children: [
      { path: getLoginLink(), element: <LoginPage /> },
      // { path: getRegisterLink(), element: <RegisterPage /> },
    ],
  },
];

export default publicRoute;
