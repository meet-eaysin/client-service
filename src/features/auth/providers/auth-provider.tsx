import { useQueryClient } from '@tanstack/react-query';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { AuthApi } from '../api';
import { setupAxiosInterceptors } from '../services/axios-interceptor';
import TokenService from '../services/token-service';
import type { AuthTokens, User } from '../types';

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: { user: User; tokens: AuthTokens }) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  const [state, setState] = useState<{
    user: User | null;
    isLoading: boolean;
  }>({
    user: null,
    isLoading: true,
  });

  const initializeAuth = useCallback(async () => {
    try {
      const accessToken = TokenService.getAccessToken();
      const refreshToken = TokenService.getRefreshToken();

      if (!accessToken || !refreshToken) {
        setState({ user: null, isLoading: false });
        return;
      }

      const { data: user } = await AuthApi.getMe();
      setState({ user, isLoading: false });
    } catch (error) {
      console.log(error);
      TokenService.clearTokens();
      setState({ user: null, isLoading: false });
    }
  }, []);

  const login = useCallback(
    ({ user, tokens }: { user: User; tokens: AuthTokens }) => {
      TokenService.setTokens(tokens.access.token, tokens.refresh.token);
      setState({ user, isLoading: false });
    },
    [],
  );

  const logout = useCallback(() => {
    TokenService.clearTokens();
    queryClient.clear();
    setState({ user: null, isLoading: false });
  }, [queryClient]);

  useEffect(() => {
    initializeAuth();
    setupAxiosInterceptors(logout);
  }, [initializeAuth, logout]);

  const value = useMemo(
    () => ({
      user: state.user,
      isAuthenticated: !!state.user,
      isLoading: state.isLoading,
      login,
      logout,
    }),
    [state.user, state.isLoading, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthControl = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
