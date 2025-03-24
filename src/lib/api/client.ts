import { AuthApi } from '@/features/auth/api';
import TokenService from '@/features/auth/services/token-service';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
  const token = TokenService.getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = TokenService.getRefreshToken();
        if (!refreshToken) throw new Error('No refresh token');

        const { data } = await AuthApi.refreshToken(refreshToken);
        TokenService.setTokens(data.access.token, data.refresh.token);

        originalRequest.headers.Authorization = `Bearer ${data.access.token}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token failed:', refreshError);
        TokenService.clearTokens();
        window.location.href = '/';
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
