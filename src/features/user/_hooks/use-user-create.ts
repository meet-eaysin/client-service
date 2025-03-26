import { useCreateUserMutation } from '@/api/users/users-api';
import { userMessages } from '@/constants/user-messages';
import useCloseModal from '@/hooks/use-close-modal';
import { handleApiCall } from '@/utils/handle-api-call';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z
  .object({
    username: z.string().min(1, { message: 'Username is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'Confirm password must be at least 6 characters' }),
    role: z.string().min(1, { message: 'Role is required' }),
    status: z.enum(['Pending', 'Active', 'Inactive']).default('Pending'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

export type UserFormDataType = z.infer<typeof formSchema>;

const initialState: UserFormDataType = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: '',
  status: 'Pending',
};

const useUserCreate = () => {
  const { closeAllModals } = useCloseModal();

  const form = useForm<UserFormDataType>({
    resolver: zodResolver(formSchema),
    defaultValues: { ...initialState },
  });

  const [createUser, { isError: isUserError, error: userError }] =
    useCreateUserMutation();

  const onSubmit = (data: UserFormDataType) => {
    const mutableData = { ...data } as Partial<UserFormDataType>;
    delete mutableData?.confirmPassword;

    handleApiCall({
      apiCall: createUser(data).unwrap(),
      successMessage: userMessages?.success?.create,
      errorMessage: userMessages?.error?.update,
      onSuccess: () => closeAllModals(),
    });
  };

  return {
    onSubmit,
    isUserError,
    userError,
    form,
    errors: form.formState.errors,
    isSubmitting: form?.formState?.isSubmitting,
    closeAllModals,
  };
};

export default useUserCreate;
