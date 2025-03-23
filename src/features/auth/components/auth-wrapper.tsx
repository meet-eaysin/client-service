import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface AuthPageProps {
  title: string;
  description: string;
  form: ReactNode;
  buttonLabel: string;
  buttonLink: string;
  promptText: string;
}

const AuthWrapper = ({
  title,
  description,
  form,
  buttonLabel,
  buttonLink,
  promptText,
}: AuthPageProps) => {
  return (
    <div className='relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <div className='relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r'>
        <div className='absolute inset-0 bg-zinc-900' />
        <div className='relative z-20 flex items-center text-lg font-semibold'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='mr-2 h-6 w-6'
          >
            <path d='M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' />
          </svg>
          Sync-Workbench
        </div>
        <div className='relative z-20 mt-4'>
          <p className='text-md font-light'>
            Sync-Workbench is designed to empower organizations with seamless
            workforce management. From onboarding to performance analytics, it
            simplifies complex workflows with robust security and integration
            features.
          </p>
        </div>
        <div className='relative z-20 mt-6'>
          <h2 className='text-lg font-semibold'>Key Benefits</h2>
          <ul className='mt-2 space-y-2 text-sm font-light list-disc list-inside'>
            <li>Enhanced productivity with streamlined workflows</li>
            <li>Secure, role-based access to critical data</li>
            <li>Comprehensive compliance and document management</li>
            <li>Customizable features to scale with your team</li>
          </ul>
        </div>
        <div className='relative z-20 mt-auto pt-8'>
          <h3 className='text-md font-semibold'>About the Developer</h3>
          <p className='text-sm font-light mt-2'>
            Developed by a skilled engineer passionate about innovative
            solutions for workforce management. Driven to optimize productivity
            and ensure data privacy across all functionalities.
          </p>
        </div>
      </div>
      <div className='flex h-full items-center p-4 lg:p-8'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col space-y-2 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight'>{title}</h1>
            <p className='text-sm text-muted-foreground'>{description}</p>
          </div>
          {form}
          <div className='flex flex-col items-center mt-4 space-y-2'>
            <p className='text-sm text-muted-foreground'>{promptText}</p>
            <Link
              to={buttonLink}
              className={cn(
                buttonVariants({ variant: 'outline' }),
                'w-full text-center',
              )}
            >
              {buttonLabel}
            </Link>
          </div>
          <p className='px-8 text-center text-sm text-muted-foreground'>
            By clicking continue, you agree to our{' '}
            <Link
              to='/terms'
              className='underline underline-offset-4 hover:text-primary'
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              to='/privacy'
              className='underline underline-offset-4 hover:text-primary'
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthWrapper;
