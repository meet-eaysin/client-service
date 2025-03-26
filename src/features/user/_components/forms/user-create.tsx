import { Button } from '@/components/ui/button';
import { Form, TextField } from '@/lib/forms';
import { PasswordField } from '@/lib/forms/fields/password-field';
import { z } from 'zod';
import { useCreateUser } from '../../api/user-queries';
import { useUserContext } from '../../context/user-context';

const passwordSchema = z
  .string()
  .min(1, 'Password is required')
  .refine(
    (value) =>
      value.length >= 8 && /[0-9]/.test(value) && /[a-zA-Z]/.test(value),
    {
      message:
        'Must contain at least 8 characters with both letters and numbers',
    },
  )
  .refine((value) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value), {
    message: 'Add at least 1 special character for better security',
  });

const registrationSchema = z
  .object({
    email: z.string().email(),
    password: passwordSchema,
    name: z.string().min(1, 'Name is required'),
    confirmPassword: z.string().min(1, 'Confirm Password is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const UserForm = () => {
  const defaultValues = {
    confirmPassword: '',
    email: '',
    name: '',
    password: '',
  };

  const { mutate, isPending } = useCreateUser();
  const { closeAll } = useUserContext();

  const handleSubmit = (data: z.infer<typeof registrationSchema>) => {
    mutate(data);
  };

  return (
    <Form
      schema={registrationSchema}
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
    >
      <div className='grid md:grid-cols-2 md:items-start md:justify-center gap-3'>
        <TextField
          name='name'
          label='Full Name'
          placeholder='John Doe'
          autoComplete='name'
          containerClass='space-y-2'
          inputClass='h-11'
        />

        <TextField
          name='email'
          label='Email Address'
          placeholder='name@company.com'
          autoComplete='email'
          containerClass='space-y-2'
          inputClass='h-11'
        />

        <PasswordField
          name='password'
          label='Password'
          placeholder='Enter your password'
          autoComplete='new-password'
          containerClass='space-y-2'
          inputClass='h-11'
          showStrength
          validateWhileTyping
        />

        <PasswordField
          name='confirmPassword'
          label='Confirm Password'
          placeholder='Confirm your password'
          autoComplete='new-password'
          containerClass='space-y-2'
          inputClass='h-11'
        />
      </div>

      <div className='pt-4 w-full flex justify-end gap-5'>
        <Button type='button' onClick={closeAll} variant={'outline'}>
          Cancel
        </Button>

        <Button disabled={isPending} type='submit'>
          {isPending ? 'Creating...' : 'Create'}
        </Button>
      </div>
    </Form>
  );
};

export default UserForm;
