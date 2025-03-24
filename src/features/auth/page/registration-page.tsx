import RegisterForm from '../components/registration-form';

export const RegistrationPage = () => {
  return (
    <div className='flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10'>
      <div className='w-full'>
        <RegisterForm />
      </div>
    </div>
  );
};
