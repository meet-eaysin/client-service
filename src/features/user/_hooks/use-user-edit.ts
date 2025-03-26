import { useUpdateUserPartiallyMutation } from '@/api/users/users-api';
import { RootState } from '@/app/store';
import { userMessages } from '@/constants/user-messages';
import useCloseModal from '@/hooks/use-close-modal';
import { handleApiCall } from '@/utils/handle-api-call';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { z } from 'zod';
import { UserTableRow } from '../_type';

const formSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  role: z.string().min(1, { message: 'Role is required' }),
  status: z.enum(['Pending', 'Active', 'Inactive']).default('Pending'),
});

export type UserEditFormDataType = z.infer<typeof formSchema>;

const useUserEdit = () => {
  const { closeAllModals } = useCloseModal();

  const user = useSelector(
    (state: RootState) => state.modal.editModal.data as UserTableRow | null,
  );
  const form = useForm<UserEditFormDataType>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const [updateUser, { isError, error }] = useUpdateUserPartiallyMutation();

  const onSubmit = (data: UserEditFormDataType) => {
    handleApiCall({
      apiCall: updateUser({ id: user?.id || '', body: data }),
      successMessage: userMessages?.success?.update,
      errorMessage: userMessages?.error?.update,
      onSuccess: () => closeAllModals(),
    });
  };

  useEffect(() => {
    if (user) form.reset(user);
  }, [user, form]);

  return {
    onSubmit,
    isError,
    error,
    form,
    isSubmitting: form?.formState?.isSubmitting,
    errors: form.formState.errors,
  };
};

export default useUserEdit;
