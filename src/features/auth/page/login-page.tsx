import LoginForm from '../components/login-form';

export const LoginPage = () => {
  return (
    <div className='flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10'>
      <div className='w-full'>
        <LoginForm />
      </div>
    </div>
  );
};
