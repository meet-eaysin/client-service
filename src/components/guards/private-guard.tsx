import { useAuthControl } from '@/features/auth/provider/auth-provider';
import { Navigate, Outlet } from 'react-router-dom';
import { FullPageLoader } from '../full-page-loader';

type ProtectedRouteProps = {
  roles?: string[];
};

export const ProtectedRoute = ({ roles }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, user } = useAuthControl();

  if (isLoading) return <FullPageLoader />;
  if (!isAuthenticated) return <Navigate to='/' replace />;
  if (roles && !roles.includes(user!.role))
    return <Navigate to='/unauthorized' replace />;

  return <Outlet />;
};
