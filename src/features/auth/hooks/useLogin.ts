import { FormRef } from '@/lib/forms';
import { TApiResponse } from '@/types/api';
import { CheckedState } from '@radix-ui/react-checkbox';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { z } from 'zod';
import { AuthApi } from '../api';
import { TAuthResponse } from '../types';
import { useAuth } from './useAuth';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const useLogin = () => {
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const formRef = useRef<FormRef<z.infer<typeof loginSchema>>>(null);
  const { login } = useAuth();

  const defaultValues = {
    email: 'superadmin@example.com',
    password: 'superadminpassword1',
  };

  const { mutate, isPending, error } = useMutation({
    mutationFn: AuthApi.login,
    onSuccess: (response: TApiResponse<TAuthResponse>) => {
      if (response.success) {
        const { user, tokens } = response.data;
        login({ user, tokens });
      }
    },
  });

  const handleSubmit = (data: z.infer<typeof loginSchema>) => {
    if (rememberMe) {
      localStorage.setItem('username', data.email);
      localStorage.setItem('password', data.password);
    } else {
      localStorage.removeItem('username');
      localStorage.removeItem('password');
    }
    mutate(data);
  };

  const handleRememberMe = (checked: CheckedState) => {
    setRememberMe(Boolean(checked));
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    if (storedEmail && storedPassword && formRef.current) {
      formRef.current.setValue('email', storedEmail);
      formRef.current.setValue('password', storedPassword);
      setRememberMe(true);
    }
  }, []);

  return {
    defaultValues,
    errorMessage: error?.message,
    isPending,
    handleSubmit,
    handleRememberMe,
    rememberMe,
  };
};

export { loginSchema, useLogin };
