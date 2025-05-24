// @ts-nocheck


import axios from 'axios';
import { AuthApi } from '../api';
import TokenService from './token-service';

let isInterceptorSetUp = false;

export const setupAxiosInterceptors = (logout: () => void) => {
  if (isInterceptorSetUp) return;

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

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshToken = TokenService.getRefreshToken();
          if (refreshToken) {
            const { data } = await AuthApi.refreshToken(refreshToken);
            TokenService.setTokens(data.access.token, data.refresh.token);
            originalRequest.headers.Authorization = `Bearer ${data.access.token}`;
            return axios(originalRequest);
          }
        } catch (refreshError) {
          console.error('Refresh token error:', refreshError);
          logout();
          window.location.href = '/';
        }
      }

      return Promise.reject(error);
    },
  );

  isInterceptorSetUp = true;
};
