import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { z } from 'zod';
import { AuthApi } from '../api';
import { useAuth } from './useAuth';

const passwordSchema = z
  .string()
  .min(1, 'Password is required')
  .refine(
    (value) =>
      value.length >= 8 && /[0-9]/.test(value) && /[a-zA-Z]/.test(value),
    {
      message:
        'Must contain at least 8 characters with both letters and numbers',
    },
  )
  .refine((value) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value), {
    message: 'Add at least 1 special character for better security',
  });

const registrationSchema = z
  .object({
    email: z.string().email(),
    password: passwordSchema,
    name: z.string().min(1, 'Name is required'),
    confirmPassword: z.string().min(1, 'Confirm Password is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

// Type exports
export type PasswordType = z.infer<typeof passwordSchema>;
export type RegistrationFormType = z.infer<typeof registrationSchema>;

const useRegistration = () => {
  const defaultValues = {
    confirmPassword: '',
    email: '',
    name: '',
    password: '',
  };
  const { login } = useAuth();
  const [termsAccepted, setTermsAccepted] = useState(false);

  const { mutate, isPending, error } = useMutation({
    mutationFn: AuthApi.register,
    onSuccess: (response) => {
      if (response.success) {
        const { user, tokens } = response.data;
        login({ user, tokens });
      }
    },
  });

  const handleSubmit = (data: RegistrationFormType) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...registrationData } = data;
    mutate(registrationData);
  };

  return {
    handleSubmit,
    isPending,
    termsAccepted,
    setTermsAccepted,
    defaultValues,
    errorMessage: error?.message,
  };
};

export { registrationSchema, useRegistration };
