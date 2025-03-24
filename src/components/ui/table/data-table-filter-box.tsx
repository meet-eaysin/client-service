import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { CheckIcon, PlusCircleIcon } from 'lucide-react';
import React from 'react';

interface FilterOption {
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface FilterBoxProps {
  filterKey: string;
  title: string;
  options: FilterOption[];
  setFilterValue: (value: string | null) => void;
  filterValue: (string | null)[];
  resetFilterByKey: (key: string) => void;
}

export function DataTableFilterBox({
  title,
  options,
  setFilterValue,
  filterKey,
  filterValue,
  resetFilterByKey,
}: FilterBoxProps) {
  const selectedValuesSet = React.useMemo(() => {
    if (!filterValue) return new Set<string>();
    return new Set(filterValue.filter((value) => value !== ''));
  }, [filterValue]);

  const handleSelect = (value: string) => {
    setFilterValue(value);
  };

  const resetFilter = () => resetFilterByKey(filterKey);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' className='border-dashed'>
          <PlusCircleIcon className='mr-2 h-4 w-4' />
          {title}
          {selectedValuesSet.size > 0 && (
            <>
              <Separator orientation='vertical' className='mx-2 h-4' />
              <Badge
                variant='secondary'
                className='rounded-sm px-1 font-normal lg:hidden'
              >
                {selectedValuesSet.size}
              </Badge>
              <div className='hidden space-x-1 lg:flex'>
                {selectedValuesSet.size > 2 ? (
                  <Badge
                    variant='secondary'
                    className='rounded-sm px-1 font-normal'
                  >
                    {selectedValuesSet.size} selected
                  </Badge>
                ) : (
                  Array.from(selectedValuesSet).map((value) => (
                    <Badge
                      variant='secondary'
                      key={value}
                      className='rounded-sm px-1 font-normal'
                    >
                      {options.find((option) => option.value === value)
                        ?.label || value}
                    </Badge>
                  ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0' align='start'>
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => handleSelect(option.value)}
                >
                  <div
                    className={cn(
                      'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                      selectedValuesSet.has(option.value)
                        ? 'bg-primary text-primary-foreground'
                        : 'opacity-50 [&_svg]:invisible',
                    )}
                  >
                    <CheckIcon className='h-4 w-4' aria-hidden='true' />
                  </div>
                  {option.icon && (
                    <option.icon
                      className='mr-2 h-4 w-4 text-muted-foreground'
                      aria-hidden='true'
                    />
                  )}
                  <span>{option.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
            {selectedValuesSet.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup onClick={resetFilter}>
                  <CommandItem className='justify-center text-center cursor-pointer'>
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
