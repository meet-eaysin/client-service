// src/features/auth/components/login-form.tsx
import { Button } from '@/components/ui/button';
import apiClient from '@/lib/api/client';
import { Form, TextField } from '@/lib/forms';
import { PasswordField } from '@/lib/forms/fields/password-field';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useAuth } from '../hooks/useAuth';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const defaultValues = {
    email: 'superadmin@example.com',
    password: 'superadminpassword1',
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (credentials: z.infer<typeof loginSchema>) => {
      const response = await apiClient.post('/auth/login', credentials);
      return response.data;
    },
    onSuccess: (data) => {
      console.log('data', data);

      login(data);
      navigate('/dashboard');
    },
    onError: (error: unknown) => {
      console.error('Login error:', error);
    },
  });

  const handleSubmit = (data: z.infer<typeof loginSchema>) => {
    mutate(data);
  };

  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-2xl font-bold'>Welcome back</h1>
        <p className='text-muted-foreground mt-2'>
          Enter your credentials to sign in
        </p>
      </div>

      <Form
        schema={loginSchema}
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        className='space-y-4'
      >
        <TextField
          name='email'
          label='Email'
          placeholder='you@example.com'
          autoComplete='email'
        />

        <PasswordField
          name='password'
          label='Password'
          placeholder='••••••••'
          autoComplete='current-password'
        />

        {/* {error && (
          <p className='text-sm font-medium text-destructive'>
            {error.message}
          </p>
        )} */}

        <div className='flex items-center justify-between'>
          <Link
            to='/forgot-password'
            className='text-sm font-medium text-primary hover:underline'
          >
            Forgot password?
          </Link>
        </div>

        <Button type='submit' className='w-full' disabled={isPending}>
          {isPending ? 'Signing in...' : 'Sign in'}
        </Button>

        <div className='relative my-6'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t' />
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-background px-2 text-muted-foreground'>
              Or continue with
            </span>
          </div>
        </div>

        <div className='flex gap-2'>
          <Button variant='outline' className='flex-1' type='button'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='mr-2 h-4 w-4'
              viewBox='0 0 24 24'
            >
              {/* Google SVG icon */}
            </svg>
            Google
          </Button>
          <Button variant='outline' className='flex-1' type='button'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='mr-2 h-4 w-4'
              viewBox='0 0 24 24'
            >
              {/* GitHub SVG icon */}
            </svg>
            GitHub
          </Button>
        </div>

        <p className='text-center text-sm text-muted-foreground'>
          Don't have an account?{' '}
          <Link
            to='/register'
            className='font-medium text-primary hover:underline'
          >
            Sign up
          </Link>
        </p>
      </Form>
    </div>
  );
};
