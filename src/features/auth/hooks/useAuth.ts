import { useAuthControl } from '@/features/auth/provider/auth-provider';
import { useQueryClient } from '@tanstack/react-query';
import { AuthTokens, User } from '../types';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const { user, isAuthenticated, isLoading, login, logout } = useAuthControl();

  const enhancedLogin = (payload: { user: User; tokens: AuthTokens }) => {
    login(payload);
    queryClient.removeQueries();
  };

  const enhancedLogout = () => {
    logout();
    queryClient.clear();
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    login: enhancedLogin,
    logout: enhancedLogout,
  };
};
