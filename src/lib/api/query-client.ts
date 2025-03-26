// src/lib/api/query-client.ts
import { getLoginLink } from '@/routes/router-link';
import { TApiError } from '@/types/api';
import { QueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

// Type guard with enhanced checks
const isApiError = (error: unknown): error is TApiError => {
  return error instanceof Error && 'code' in error && 'message' in error;
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: (failureCount, error) => {
        if (!isApiError(error)) return false;
        return (
          !['UNAUTHORIZED', 'FORBIDDEN', 'NETWORK_ERROR'].includes(
            error.code,
          ) && failureCount < 2
        );
      },
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
});

// Global query error handler
queryClient.getQueryCache().config.onError = (error) => {
  if (isApiError(error)) {
    // Error reporting
    if (typeof window !== 'undefined' && window._Sentry) {
      window._Sentry.captureException(error);
    }

    // User notifications
    if (typeof window !== 'undefined') {
      if (error.code === 'NETWORK_ERROR') {
        toast.error(
          'Unable to connect to the server. Please check your internet connection.',
        );
      } else {
        toast.error(error.message || 'Failed to fetch data');
      }
    }

    // Special handling
    if (error.httpStatus === 401) {
      window.location.href = getLoginLink();
    }
  }
};

// Global mutation error handler
queryClient.getMutationCache().config.onError = (error) => {
  if (isApiError(error)) {
    // Error reporting
    if (typeof window !== 'undefined' && window._Sentry) {
      window._Sentry.captureException(error);
    }

    // User notifications
    if (typeof window !== 'undefined') {
      if (error.code === 'NETWORK_ERROR') {
        toast.error(
          'Unable to connect to the server. Please check your internet connection.',
        );
      } else if (error.validationErrors) {
        toast.error('Validation errors occurred. Please check your input.');
      } else {
        toast.error(error.message || 'Operation failed');
      }
    }

    // Special handling
    if (error.httpStatus === 401) {
      window.location.href = getLoginLink();
    }
  }
};
