import PublicGuard from '@/components/guards/public-guard';
import { LoginPage, RegistrationPage } from '@/features/auth/page';
import { RouteObject } from 'react-router-dom';
import { getLoginLink, getRegisterLink } from './router-link';

const publicRoute: RouteObject[] = [
  {
    element: <PublicGuard />,
    children: [
      { path: getLoginLink(), element: <LoginPage /> },
      { path: getRegisterLink(), element: <RegistrationPage /> },
    ],
  },
];

export default publicRoute;
