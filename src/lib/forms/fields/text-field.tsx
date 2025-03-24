import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { HTMLInputTypeAttribute } from 'react';
import { FieldValues, Path } from 'react-hook-form';
import { useFormControl } from '../form/context';

type TextFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  autoComplete?: string;
  containerClass?: string;
  inputClass?: string;
};

export const TextField = <T extends FieldValues>(props: TextFieldProps<T>) => {
  const { control } = useFormControl<T>();

  return (
    <FormField
      control={control}
      name={props.name}
      render={({ field }) => (
        <FormItem className={cn(props.containerClass)}>
          {props.label && <FormLabel>{props.label}</FormLabel>}
          <FormControl>
            <Input
              className={cn(props.inputClass)}
              {...field}
              placeholder={props.placeholder}
              type={props.type}
              autoComplete={props.autoComplete}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
