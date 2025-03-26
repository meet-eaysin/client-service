import User from './_components';
import { UserProvider } from './context/user-context';

const UsersPage = () => {
  return (
    <UserProvider>
      <User />
    </UserProvider>
  );
};

export default UsersPage;
