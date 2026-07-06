export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthData {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  role: string;
  userId: number;
  email: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: AuthData | null;
  errors: string[] | null;
}
