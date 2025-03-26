// src/lib/api/client.ts
import { AuthApi } from '@/features/auth/api';
import TokenService from '@/features/auth/services/token-service';
import { getLoginLink } from '@/routes/router-link';
import {
  TApiError,
  TApiResponse,
  TErrorApiResponse,
  TSuccessApiResponse,
} from '@/types/api';
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

// Extend axios config types
declare module 'axios' {
  interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}

// Type guard for error responses
const isErrorResponse = (
  response: TApiResponse,
): response is TErrorApiResponse => {
  return !response.success;
};

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = TokenService.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor
apiClient.interceptors.response.use(
  (
    response: AxiosResponse<TApiResponse>,
  ): AxiosResponse<TSuccessApiResponse> => {
    if (isErrorResponse(response.data)) {
      const errorData = response.data;
      const error = new AxiosError(
        errorData.error.message || 'API Error',
        response.status.toString(),
        response.config,
        response.request,
        response,
      );
      error.code = errorData.error.code;
      throw error;
    }

    return response as AxiosResponse<TSuccessApiResponse>;
  },
  async (error: AxiosError<TApiResponse>) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = TokenService.getRefreshToken();
        if (!refreshToken) throw new Error('No refresh token');

        const { data } = await AuthApi.refreshToken(refreshToken);
        if (data.success) {
          TokenService.setTokens(
            data.data.tokens.access.token,
            data.data.tokens.refresh.token,
          );

          originalRequest.headers.Authorization = `Bearer ${data.data.tokens.access.token}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        console.error('Refresh token error:', refreshError);
        TokenService.clearTokens();
        window.location.href = getLoginLink();
        return Promise.reject({
          code: 'TOKEN_REFRESH_FAILED',
          message: 'Session expired',
        });
      }
    }

    const apiError: TApiError = {
      code: error.code || 'UNKNOWN_ERROR',
      message: error.message,
      ...(error.response?.data && isErrorResponse(error.response.data)
        ? error.response.data.error
        : {}),
      httpStatus: error.response?.status,
    };

    return Promise.reject(apiError);
  },
);

export default apiClient;
