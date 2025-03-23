import { Button } from '@/components/ui/button';
import { useNavigate, useRouteError } from 'react-router-dom';

export default function ErrorBoundaryFallback() {
  const error = useRouteError();
  const navigate = useNavigate();

  const handleReload = () => window.location.reload();
  const handleGoHome = () => navigate('/');

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-4'>
      <h1 className='text-4xl font-bold'>Something went wrong</h1>
      <p className='text-muted-foreground'>
        {error instanceof Error ? error.message : 'Unknown error'}
      </p>
      <div className='flex gap-2'>
        <Button onClick={handleReload}>Reload Page</Button>
        <Button variant='outline' onClick={handleGoHome}>
          Go to Home
        </Button>
      </div>
    </div>
  );
}
