import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useState } from 'react';
import type { FieldValues, Path } from 'react-hook-form';
import { useFormControl } from '../form/context';

type PasswordFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  autoComplete?: string;
  showVisibilityToggle?: boolean;
  className?: string;
};

export const PasswordField = <T extends FieldValues>({
  name,
  label,
  placeholder = 'Enter password',
  autoComplete = 'current-password',
  showVisibilityToggle = true,
  className,
}: PasswordFieldProps<T>) => {
  const control = useFormControl<T>();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <div className='relative'>
            <FormControl>
              <Input
                {...field}
                type={showPassword ? 'text' : 'password'}
                placeholder={placeholder}
                autoComplete={autoComplete}
                className='pr-10'
              />
            </FormControl>

            {showVisibilityToggle && (
              <Button
                type='button'
                variant='ghost'
                size='icon'
                className='absolute right-0 top-0 h-full px-3'
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOffIcon className='h-4 w-4' />
                ) : (
                  <EyeIcon className='h-4 w-4' />
                )}
              </Button>
            )}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
