import apiClient from '@/lib/api/client';
import type { AuthResponse, AuthTokens, User } from '../types';

export const AuthApi = {
  login: async (payload: { email: string; password: string }) => {
    const response = await apiClient.post<AuthResponse>('/auth/login', payload);
    return response.data;
  },
  register: async (payload: {
    name: string;
    email: string;
    password: string;
  }) => {
    const response = await apiClient.post<AuthResponse>(
      '/auth/register',
      payload,
    );
    return response.data;
  },
  refreshToken: (token: string) => {
    return apiClient.post<AuthTokens>('/auth/refresh-tokens', {
      refreshToken: token,
    });
  },
  getMe: () => apiClient.get<User>('/auth/me'),
  logout: () => apiClient.post('/auth/logout'),
  forgotPassword: (email: string) => {
    return apiClient.post('/auth/forgot-password', { email });
  },
  resetPassword: (payload: { token: string; password: string }) => {
    return apiClient.post('/auth/reset-password', payload);
  },
  verifyEmail: (token: string) => {
    return apiClient.post('/auth/verify-email', { token });
  },
};
