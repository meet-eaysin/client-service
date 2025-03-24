import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { CheckIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
import { useState } from 'react';
import type { FieldValues, Path } from 'react-hook-form';
import { useFormControl } from '../form/context';

type PasswordFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  autoComplete?: string;
  showVisibilityToggle?: boolean;
  containerClass?: string;
  inputClass?: string;
  showStrength?: boolean;
  validateWhileTyping?: boolean;
};

const calculatePasswordStrength = (password: string): number => {
  let strength = 0;
  if (password.length >= 8) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[a-z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[\W_]/.test(password)) strength += 1;
  return strength;
};

const getStrengthLevel = (strength: number): 'weak' | 'medium' | 'strong' => {
  if (strength <= 2) return 'weak';
  if (strength <= 4) return 'medium';
  return 'strong';
};

export const PasswordField = <T extends FieldValues>({
  name,
  label,
  placeholder = 'Enter password',
  autoComplete = 'current-password',
  showVisibilityToggle = true,
  containerClass,
  inputClass,
  showStrength = false,
}: PasswordFieldProps<T>) => {
  const { control } = useFormControl<T>();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const password = field.value || '';
        const strength = calculatePasswordStrength(password);
        const strengthLevel = getStrengthLevel(strength);
        const strengthText =
          strengthLevel.charAt(0).toUpperCase() + strengthLevel.slice(1);

        return (
          <FormItem className={cn('space-y-2', containerClass)}>
            {label && (
              <FormLabel className='text-sm font-medium'>{label}</FormLabel>
            )}
            <div className='relative'>
              <FormControl>
                <Input
                  {...field}
                  type={showPassword ? 'text' : 'password'}
                  placeholder={placeholder}
                  autoComplete={autoComplete}
                  className={cn('pr-12 transition-colors', inputClass)}
                />
              </FormControl>

              {showVisibilityToggle && (
                <Button
                  type='button'
                  variant='ghost'
                  size='icon'
                  className='absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full hover:bg-gray-100/50'
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOffIcon className='h-4 w-4 text-muted-foreground' />
                  ) : (
                    <EyeIcon className='h-4 w-4 text-muted-foreground' />
                  )}
                </Button>
              )}
            </div>

            {showStrength && (
              <div className='space-y-2'>
                <div
                  className={cn(
                    'flex items-center gap-1.5 text-xs font-medium',
                    {
                      'text-red-500': strengthLevel === 'weak',
                      'text-amber-500': strengthLevel === 'medium',
                      'text-green-500': strengthLevel === 'strong',
                    },
                  )}
                >
                  <div
                    className={cn('w-2 h-2 rounded-full animate-pulse', {
                      'bg-red-500': strengthLevel === 'weak',
                      'bg-amber-500': strengthLevel === 'medium',
                      'bg-green-500': strengthLevel === 'strong',
                    })}
                  />
                  {strengthText} Password
                </div>

                <div className='grid grid-cols-2 gap-2 text-xs text-muted-foreground'>
                  <div className='flex items-center gap-1.5'>
                    <CheckIcon
                      className={cn('h-3 w-3', {
                        'text-green-500': password.length >= 8,
                        'text-muted-foreground/30': password.length < 8,
                      })}
                    />
                    <span>8+ characters</span>
                  </div>
                  <div className='flex items-center gap-1.5'>
                    <CheckIcon
                      className={cn('h-3 w-3', {
                        'text-green-500': /[A-Z]/.test(password),
                        'text-muted-foreground/30': !/[A-Z]/.test(password),
                      })}
                    />
                    <span>Uppercase</span>
                  </div>
                  <div className='flex items-center gap-1.5'>
                    <CheckIcon
                      className={cn('h-3 w-3', {
                        'text-green-500': /[a-z]/.test(password),
                        'text-muted-foreground/30': !/[a-z]/.test(password),
                      })}
                    />
                    <span>Lowercase</span>
                  </div>
                  <div className='flex items-center gap-1.5'>
                    <CheckIcon
                      className={cn('h-3 w-3', {
                        'text-green-500': /[\W_]/.test(password),
                        'text-muted-foreground/30': !/[\W_]/.test(password),
                      })}
                    />
                    <span>Special char</span>
                  </div>
                </div>
              </div>
            )}

            <FormMessage className='text-xs font-medium' />
          </FormItem>
        );
      }}
    />
  );
};
