import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';

export const useAuthGuard = (redirectPath = '/') => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate(redirectPath);
    }
  }, [isAuthenticated, isLoading, navigate, redirectPath]);

  return { isAuthenticated, isLoading };
};
