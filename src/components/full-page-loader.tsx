import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

interface FullPageLoaderProps extends HTMLAttributes<HTMLDivElement> {
  message?: string;
}

export const FullPageLoader = ({
  message = 'Loading...',
  className,
  ...props
}: FullPageLoaderProps) => {
  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex h-screen w-full flex-col items-center justify-center bg-white/90 backdrop-blur-sm',
        className,
      )}
      role='status'
      aria-live='polite'
      aria-label='Loading'
      {...props}
    >
      {/* Spinner */}
      <div className='relative h-12 w-12'>
        <div className='absolute inset-0 rounded-full border-4 border-gray-200'></div>
        <div className='absolute inset-0 animate-spin rounded-full border-4 border-primary border-t-transparent'></div>
      </div>

      {/* Loading Message */}
      <p className='mt-4 text-sm font-medium text-gray-600'>{message}</p>
    </div>
  );
};
