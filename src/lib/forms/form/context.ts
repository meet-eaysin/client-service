import { createContext, useContext } from 'react';
import { Control, FieldValues } from 'react-hook-form';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormControlValue<T extends FieldValues = any> = {
  control: Control<T>;
};

export const FormControl = createContext<FormControlValue | null>(null);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useFormControl = <T extends FieldValues>() => {
  const context = useContext(FormControl);

  if (!context) throw new Error('useFormControl must be used within Form');
  return { control: context.control as Control<T> };
};
