import { FieldValues, Path, SubmitHandler } from 'react-hook-form';
import { z, ZodType } from 'zod';

export type FormRef<T extends FieldValues> = {
  getValues: () => T;
  setValue: (name: Path<T>, value: T[Path<T>]) => void;
  reset: (values?: Partial<T>) => void;
};

export type FormProps<TSchema extends ZodType> = {
  schema: TSchema;
  defaultValues?: Partial<z.infer<TSchema>>;
  onSubmit: SubmitHandler<z.infer<TSchema>>;
  mode?: 'onBlur' | 'onChange' | 'onSubmit';
  className?: string;
};
