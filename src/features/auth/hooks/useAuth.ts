import { useAuthControl } from '@/features/auth/providers/auth-provider';
import { useQueryClient } from '@tanstack/react-query';
import { TAuthTokens, TUser } from '../types';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const { user, isAuthenticated, isLoading, login, logout } = useAuthControl();

  const enhancedLogin = (payload: { user: TUser; tokens: TAuthTokens }) => {
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
