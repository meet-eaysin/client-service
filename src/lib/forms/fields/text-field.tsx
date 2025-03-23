import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { HTMLInputTypeAttribute } from 'react';
import { FieldValues, Path } from 'react-hook-form';
import { useFormControl } from '../form/context';

type TextFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  autoComplete?: string;
};

/**
 * Renders a text input field within a form, including optional label and placeholder.
 * Utilizes react-hook-form for form state management.
 *
 * @template T - The type of form field values.
 * @param {TextFieldProps<T>} props - The properties for the text field component.
 * @param {Path<T>} props.name - The name of the field within the form.
 * @param {string} [props.label] - An optional label for the input field.
 * @param {string} [props.placeholder] - An optional placeholder text for the input.
 * @param {HTMLInputTypeAttribute} [props.type] - The input type attribute, e.g. 'text', 'password', etc.
 * @returns {JSX.Element} The rendered TextField component.
 */

export const TextField = <T extends FieldValues>(props: TextFieldProps<T>) => {
  const control = useFormControl<T>();

  return (
    <FormField
      control={control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          {props.label && <FormLabel>{props.label}</FormLabel>}
          <FormControl>
            <Input
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
