import { RouterProvider } from 'react-router-dom';
import { FullPageLoader } from './components/full-page-loader';
import { useAuthControl } from './features/auth/providers/auth-provider';
import router from './routes';

export default function App() {
  const { isLoading } = useAuthControl();

  if (isLoading) {
    return <FullPageLoader />;
  }

  return <RouterProvider router={router} />;
}
