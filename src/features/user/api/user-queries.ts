// features/user/api/user-queries.ts
import { isErrorResponse } from '@/lib/utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { UserApi } from '.';
import { TCreateUser } from '../types';

export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) =>
    [...userKeys.lists(), params] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
  current: () => [...userKeys.all, 'current'] as const,
};

// User List Queries
export const useGetUsers = (params?: {
  page?: number;
  limit?: number;
  search?: string;
  role?: string[];
  status?: string[];
}) => {
  return useQuery({
    queryKey: userKeys.list(params ?? {}),
    queryFn: () => UserApi.getUsers(params),
    placeholderData: (previousData) => previousData,
  });
};

// Single User Queries
export const useGetUserById = (userId: string) => {
  return useQuery({
    queryKey: userKeys.detail(userId),
    queryFn: () => UserApi.getUserById(userId),
    enabled: !!userId,
  });
};

// Current User Queries
export const useCurrentUser = () => {
  return useQuery({
    queryKey: userKeys.current(),
    queryFn: UserApi.getMe,
  });
};

// User Mutations
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: UserApi.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};

export const useUpdateUser = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TCreateUser) => UserApi.updateUser(userId, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      queryClient.setQueryData(
        userKeys.detail(userId),
        isErrorResponse(data) ? data : data.data,
      );
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => UserApi.deleteUser(userId),
    onSuccess: (_, userId) => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      queryClient.removeQueries({ queryKey: userKeys.detail(userId) });
    },
  });
};

// Current User Mutations
export const useUpdateCurrentUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TCreateUser) => UserApi.updateMe(data),
    onSuccess: (data) => {
      queryClient.setQueryData(userKeys.current(), data);
    },
  });
};
