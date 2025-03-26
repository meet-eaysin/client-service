import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Column } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
  className?: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const sortedState = column.getIsSorted();

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <Button
        variant='ghost'
        size='sm'
        className='-ml-3 h-8 data-[state=open]:bg-accent'
        onClick={() => column.toggleSorting(sortedState === 'asc')}
      >
        <span>{title}</span>
        {sortedState === 'desc' ? (
          <ArrowDown className='ml-2 h-4 w-4' />
        ) : sortedState === 'asc' ? (
          <ArrowUp className='ml-2 h-4 w-4' />
        ) : (
          <ArrowUpDown className='ml-2 h-4 w-4' />
        )}
      </Button>
    </div>
  );
}
