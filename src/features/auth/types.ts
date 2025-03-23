export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
  employee: null | string;
  isEmailVerified: boolean;
}

export interface AccessToken {
  token: string;
  expires: string;
}

export interface RefreshToken {
  token: string;
  expires: string;
}

export interface AuthTokens {
  access: AccessToken;
  refresh: RefreshToken;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}
