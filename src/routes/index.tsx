import ErrorBoundaryFallback from '@/components/error-boundary';
import { createBrowserRouter } from 'react-router-dom';
import routes from './routes';

const router = createBrowserRouter([
  ...routes,
  {
    path: '*',
    element: <ErrorBoundaryFallback />,
  },
]);

export default router;
