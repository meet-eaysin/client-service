import { TRole } from '../role/types';

export type TUser = {
  id: string;
  username: string;
  name: string;
  password: string;
  email: string;
  isEmailVerified: boolean;
  role: TRole;
  status: 'Active' | 'Inactive' | 'Suspended' | 'OnLeave' | 'Pending';
  employee: null;
  createdAt: string;
  updatedAt: string;
};

export type TAuthResponse = {
  tokens: TAuthTokens;
  user: TUser;
};

export type TAuthTokens = {
  access: {
    token: string;
    expires: string;
  };
  refresh: {
    token: string;
    expires: string;
  };
};
