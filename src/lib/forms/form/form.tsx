import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode, Ref, useImperativeHandle } from 'react';
import {
  Control,
  DefaultValues,
  FieldValues,
  FormProvider,
  FormState,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from 'react-hook-form';
import { z, ZodType } from 'zod';
import { FormControl } from './context';

export type FormRef<T extends FieldValues> = {
  control: Control<T>;
  form: UseFormReturn<T>;
  formState: FormState<T>;
  getValues: () => T;
  setValue: (name: Path<T>, value: T[Path<T>]) => void;
  reset: (values?: Partial<T> | undefined) => void;
};

export type FormProps<TSchema extends ZodType> = {
  schema: TSchema;
  defaultValues?: Partial<z.infer<TSchema>>;
  onSubmit: SubmitHandler<z.infer<TSchema>>;
  ref?: Ref<FormRef<z.infer<TSchema>>>;
  children: ReactNode;
  mode?: 'onBlur' | 'onChange' | 'onSubmit';
  className?: string;
};

export const Form = <TSchema extends ZodType>(props: FormProps<TSchema>) => {
  const {
    schema,
    defaultValues,
    onSubmit,
    mode = 'onChange',
    children,
    ref,
  } = props;

  type FormValues = z.infer<TSchema>;

  const methods = useForm<FormValues>({
    mode,
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<FormValues>,
  });

  useImperativeHandle(ref, () => ({
    control: methods.control,
    form: methods,
    formState: methods.formState,
    getValues: methods.getValues,
    setValue: methods.setValue,
    reset: methods.reset,
  }));

  return (
    <FormControl.Provider value={{ control: methods.control }}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
      </FormProvider>
    </FormControl.Provider>
  );
};
