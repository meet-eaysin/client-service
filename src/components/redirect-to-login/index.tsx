import { getLoginLink } from '@/routes/router-link';
import { Navigate } from 'react-router-dom';

const RedirectToLogin = () => <Navigate to={getLoginLink()} />;

export default RedirectToLogin;
