import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { FieldValues, Path } from 'react-hook-form';
import { useFormControl } from '../form/context';

type CheckboxFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  description?: string;
};

export const CheckboxField = <T extends FieldValues>({
  name,
  label,
  description,
}: CheckboxFieldProps<T>) => {
  const { control } = useFormControl<T>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div className='space-y-1 leading-none'>
            {label && <FormLabel>{label}</FormLabel>}
            {description && (
              <p className='text-sm text-muted-foreground'>{description}</p>
            )}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
