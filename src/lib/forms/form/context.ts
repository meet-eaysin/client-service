import { createContext, useContext } from 'react';
import { Control, FieldValues } from 'react-hook-form';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormControlValue<TFormValues extends FieldValues = any> = {
  control: Control<TFormValues>;
};

export const FormControl = createContext<FormControlValue | null>(null);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useFormControl = <T extends FieldValues = any>() => {
  const context = useContext(FormControl);

  if (!context) throw new Error('useFormControl must be used within Form');
  return context.control as Control<T>;
};
