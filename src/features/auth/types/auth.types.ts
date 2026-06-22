export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: string | null;   // JWT token string on success
  errors: string[] | null;
}
