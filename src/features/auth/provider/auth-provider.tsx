import { AuthApi } from '@/features/auth/api';
import TokenService from '@/features/auth/service/tokenService';
import { AuthResponse, User } from '@/features/auth/types';
import axios from 'axios';
import { createContext, useContext, useEffect, useReducer } from 'react';

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

type AuthAction =
  | {
      type: 'INITIALIZE';
      payload: { user: User | null; isAuthenticated: boolean };
    }
  | { type: 'LOGIN'; payload: { user: User } }
  | { type: 'LOGOUT' };

type AuthContextType = AuthState & {
  login: (response: AuthResponse) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'INITIALIZE':
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: action.payload.isAuthenticated,
        isLoading: false,
      };
    case 'LOGIN':
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const initializeAuth = async () => {
    try {
      const accessToken = TokenService.getAccessToken();
      const refreshToken = TokenService.getRefreshToken();

      if (!accessToken || !refreshToken) {
        dispatch({
          type: 'INITIALIZE',
          payload: { user: null, isAuthenticated: false },
        });
        return;
      }

      if (TokenService.isAccessTokenExpired()) {
        const { data: newTokens } = await AuthApi.refreshToken(refreshToken);
        TokenService.setTokens(newTokens.access.token, newTokens.refresh.token);
      }

      const { data: user } = await AuthApi.getMe();
      dispatch({
        type: 'INITIALIZE',
        payload: { user, isAuthenticated: true },
      });
    } catch (error) {
      console.log(error);

      TokenService.clearTokens();
      dispatch({
        type: 'INITIALIZE',
        payload: { user: null, isAuthenticated: false },
      });
    }
  };

  const login = (response: AuthResponse) => {
    TokenService.setTokens(
      response.tokens.access.token,
      response.tokens.refresh.token,
    );
    dispatch({ type: 'LOGIN', payload: { user: response.user } });
  };

  const logout = () => {
    TokenService.clearTokens();
    dispatch({ type: 'LOGOUT' });
  };

  useEffect(() => {
    initializeAuth();
    setupAxiosInterceptors(logout);
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

type FailedQueueItem = {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
};

const setupAxiosInterceptors = (logout: () => void) => {
  let isRefreshing = false;
  let failedQueue: FailedQueueItem[] = [];

  const processQueue = (error: unknown) => {
    failedQueue.forEach((prom) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      error ? prom.reject(error) : prom.resolve();
    });
    failedQueue = [];
  };

  axios.interceptors.request.use((config) => {
    const token = TokenService.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      const refreshToken = TokenService.getRefreshToken();

      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        refreshToken
      ) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then(() => axios(originalRequest))
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const { data: newTokens } = await AuthApi.refreshToken(refreshToken);
          TokenService.setTokens(
            newTokens.access.token,
            newTokens.refresh.token,
          );
          originalRequest.headers.Authorization = `Bearer ${newTokens.access.token}`;
          processQueue(null);
          return axios(originalRequest);
        } catch (error) {
          processQueue(error);
          logout();
          window.location.href = '/login';
          return Promise.reject(error);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    },
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthControl = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
