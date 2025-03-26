// features/user/api/user.ts
import { TUser } from '@/features/auth/types';
import apiClient from '@/lib/api/client';
import { TApiResponse, TPaginatedResponse } from '@/types/api';
import { TCreateUser } from '../types';

export const UserApi = {
  /**
   * Get paginated list of users (Admin only)
   */
  getUsers: async (params?: {
    name?: string;
    role?: string[];
    status?: string[];
    sortBy?: string;
    projectBy?: string[];
    limit?: number;
    page?: number;
    search?: string;
  }) => {
    const response = await apiClient.get<
      TApiResponse<TPaginatedResponse<TUser>>
    >('/users', {
      params: {
        ...params,
        role: params?.role?.join(','),
        status: params?.status?.join(','),
        projectBy: params?.projectBy?.join(','),
      },
    });
    return response.data;
  },

  /**
   * Get user by ID (Admin/Self)
   */
  getUserById: async (userId: string) => {
    const response = await apiClient.get<TApiResponse<TUser>>(
      `/users/${userId}`,
    );
    return response.data;
  },

  /**
   * Create new user (Admin only)
   */
  createUser: async (payload: TCreateUser) => {
    const response = await apiClient.post<TApiResponse<TUser>>(
      '/users',
      payload,
    );
    return response.data;
  },

  /**
   * Update user (Admin/Self)
   */
  updateUser: async (userId: string, payload: TCreateUser) => {
    const response = await apiClient.patch<TApiResponse<TUser>>(
      `/users/${userId}`,
      payload,
    );
    return response.data;
  },

  /**
   * Delete user (Admin/Self)
   */
  deleteUser: async (userId: string) => {
    const response = await apiClient.delete<TApiResponse<{ id: string }>>(
      `/users/${userId}`,
    );
    return response.data;
  },

  /**
   * Get current authenticated user profile
   */
  getMe: async () => {
    const response = await apiClient.get<TApiResponse<TUser>>('/users/me');
    return response.data;
  },

  /**
   * Update current user profile
   */
  updateMe: async (payload: TCreateUser) => {
    const response = await apiClient.patch<TApiResponse<TUser>>(
      '/users/me',
      payload,
    );
    return response.data;
  },
};
