import apiClient from '@/lib/api/client';
import { AuthResponse, AuthTokens, User } from '../types';

type LoginPayload = {
  email: string;
  password: string;
};

export const AuthApi = {
  login: (payload: LoginPayload) => {
    return apiClient.post<AuthResponse>('/auth/login', payload);
  },
  refreshToken: (token: string) => {
    return apiClient.post<AuthTokens>('/auth/refresh-token', token);
  },
  logout: () => apiClient.post<void>('/auth/logout'),
  getMe: () => apiClient.get<User>('/auth/me'),
  verifyEmail: (token: string) => {
    return apiClient.post<AuthResponse>('/auth/verify-email', { token });
  },
  forgotPassword: (email: string) => {
    return apiClient.post<void>('/auth/forgot-password', { email });
  },
  resetPassword: (payload: { token: string; password: string }) => {
    return apiClient.post<AuthResponse>('/auth/reset-password', payload);
  },
};
