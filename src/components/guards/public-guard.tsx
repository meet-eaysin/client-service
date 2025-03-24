import { useAuthControl } from '@/features/auth/providers/auth-provider';
import { getDashboardLink } from '@/routes/router-link';
import { Navigate, Outlet } from 'react-router-dom';

const PublicGuard = () => {
  const { isAuthenticated } = useAuthControl();

  return isAuthenticated ? <Navigate to={getDashboardLink()} /> : <Outlet />;
};

export default PublicGuard;
