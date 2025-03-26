import { TUser } from '@/features/auth/types';

export interface UserTableRow extends Omit<TUser, 'role'> {
  role: string;
}
