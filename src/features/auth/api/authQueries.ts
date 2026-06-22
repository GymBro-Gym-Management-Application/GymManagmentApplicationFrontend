import { useMutation } from '@tanstack/react-query';
import { login } from './authApi';
import { LoginPayload } from '../types/auth.types';

export const useLogin = () =>
  useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
  });
