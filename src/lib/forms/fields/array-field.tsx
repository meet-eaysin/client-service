// src/lib/components/forms/fields/array-field.tsx
import { Button } from '@/components/ui/button';
import { PlusIcon, TrashIcon } from 'lucide-react';
import {
  ArrayPath,
  FieldArray,
  FieldValues,
  useFieldArray,
} from 'react-hook-form';
import { useFormControl } from '../form/context';

type ArrayFieldProps<T extends FieldValues> = {
  name: ArrayPath<T>;
  label?: string;
  children: (index: number) => React.ReactNode;
  defaultItem: FieldArray<T, ArrayPath<T>>;
};

export const ArrayField = <T extends FieldValues>({
  name,
  label,
  children,
  defaultItem,
}: ArrayFieldProps<T>) => {
  const control = useFormControl<T>();
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <div className='space-y-4'>
      {label && <h4 className='font-medium'>{label}</h4>}

      {fields.map((field, index) => (
        <div key={field.id} className='flex gap-2 items-start'>
          <div className='flex-1'>{children(index)}</div>
          <Button
            type='button'
            variant='destructive'
            size='icon'
            onClick={() => remove(index)}
          >
            <TrashIcon className='h-4 w-4' />
          </Button>
        </div>
      ))}

      <Button
        type='button'
        variant='outline'
        onClick={() => append(defaultItem)}
      >
        <PlusIcon className='mr-2 h-4 w-4' />
        Add Item
      </Button>
    </div>
  );
};
