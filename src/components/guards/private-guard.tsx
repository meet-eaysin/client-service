import { useAuth } from '@/features/auth/hooks/useAuth';
import { useAuthGuard } from '@/features/auth/hooks/useAuthGuard';
import { Navigate, Outlet } from 'react-router-dom';
import { FullPageLoader } from '../full-page-loader';

type ProtectedRouteProps = {
  roles?: string[];
};

export const ProtectedRoute = ({ roles }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuthGuard();
  const { user } = useAuth(); // Get user from auth context

  if (isLoading) {
    return <FullPageLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to='/' replace />;
  }

  if (roles && !roles.includes(user?.role || '')) {
    return <Navigate to='/unauthorized' replace />;
  }

  return <Outlet />;
};
