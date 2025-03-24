import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { FormItem, FormLabel } from '@/components/ui/form';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Form, FormRef, TextField } from '@/lib/forms';
import { PasswordField } from '@/lib/forms/fields/password-field';
import { cn } from '@/lib/utils';
import { getRegisterLink } from '@/routes/router-link';
import { CheckedState } from '@radix-ui/react-checkbox';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { AuthApi } from '../api';
import { useAuth } from '../hooks/useAuth';
import { AuthTokens, User } from '../types';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const LoginForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) => {
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const formRef = useRef<FormRef<z.infer<typeof loginSchema>>>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const defaultValues = {
    email: 'superadmin@example.com',
    password: 'superadminpassword1',
  };

  const { mutate, isPending } = useMutation({
    mutationFn: AuthApi.login,
    onSuccess: ({ user, tokens }: { user: User; tokens: AuthTokens }) => {
      login({ user, tokens });
      navigate('/dashboard');
    },
    onError: (error: unknown) => {
      console.error('Login error:', error);
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

  return (
    <div className={cn('mx-auto w-full max-w-lg px-4', className)} {...props}>
      <TooltipProvider>
        <div className='bg-card rounded-2xl border p-8 shadow-lg'>
          <Form
            schema={loginSchema}
            defaultValues={defaultValues}
            onSubmit={handleSubmit}
          >
            <div className='flex flex-col gap-8'>
              {/* Header Section */}
              <div className='flex flex-col items-center gap-4'>
                <div className='bg-primary/15 rounded-sm px-2'>
                  <h1 className='text-lg font-bold'>Sync-Workbench</h1>
                </div>
                <div className='text-center'>
                  <h1 className='text-2xl font-bold tracking-tight'>
                    Welcome Back
                  </h1>
                  <p className='mt-2 text-sm text-muted-foreground'>
                    Sign in to your account to continue
                  </p>
                </div>
              </div>

              {/* Form Fields */}
              <div className='flex flex-col gap-6'>
                <div className='space-y-4'>
                  <TextField
                    name='email'
                    label='Email address'
                    placeholder='name@company.com'
                    autoComplete='email'
                    containerClass='space-y-2'
                    inputClass='h-11'
                  />

                  <PasswordField
                    name='password'
                    label='Password'
                    placeholder='Enter your password'
                    autoComplete='current-password'
                    containerClass='space-y-2'
                    inputClass='h-11'
                    showStrength
                    showVisibilityToggle
                    validateWhileTyping
                  />
                </div>

                <div className='flex items-center justify-between'>
                  <FormItem className='flex items-center space-x-2'>
                    <Checkbox
                      id='rememberMe'
                      checked={rememberMe}
                      onCheckedChange={handleRememberMe}
                      className='h-4 w-4 rounded border-muted-foreground/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary'
                    />
                    <FormLabel
                      htmlFor='rememberMe'
                      className='text-sm font-medium text-foreground'
                    >
                      Remember me
                    </FormLabel>
                  </FormItem>
                  <Link
                    to='/forgot-password'
                    className='text-sm font-medium text-primary hover:text-primary/80'
                  >
                    Forgot password?
                  </Link>
                </div>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type='submit'
                      className='h-11 w-full text-base font-semibold cursor-pointer'
                      disabled={isPending}
                    >
                      <div className='w-full flex items-center justify-center'>
                        {isPending ? (
                          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                        ) : null}
                        {isPending ? 'Signing in...' : 'Sign in'}
                      </div>
                      <TooltipContent
                        side='top'
                        className='max-w-[400px] text-center'
                      >
                        <p className='text-sm'>
                          Note: Our backend service might take 20-30 seconds to
                          wake up on first request (free deployment). Subsequent
                          requests will be faster. Thank you for your patience!
                        </p>
                      </TooltipContent>
                    </Button>
                  </TooltipTrigger>
                </Tooltip>
              </div>

              {/* Footer Links */}
              <div className='text-center text-sm text-muted-foreground'>
                Don't have an account?{' '}
                <Link
                  to={getRegisterLink()}
                  className='font-semibold text-primary hover:text-primary/80'
                >
                  Get started
                </Link>
              </div>
            </div>
          </Form>
        </div>
      </TooltipProvider>

      {/* Terms Links */}
      <div className='mt-8 text-center text-sm text-muted-foreground'>
        <p>
          By continuing, you agree to our{' '}
          <Link
            to='/terms'
            className='font-medium text-primary underline underline-offset-4 hover:text-primary/80'
          >
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link
            to='/privacy'
            className='font-medium text-primary underline underline-offset-4 hover:text-primary/80'
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
