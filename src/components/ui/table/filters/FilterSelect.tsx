import { cn } from '@/lib/utils';
import { CheckIcon, PlusCircleIcon } from 'lucide-react';
import { Badge } from '../../badge';
import { Button } from '../../button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '../../command';
import { Popover, PopoverContent, PopoverTrigger } from '../../popover';
import { Separator } from '../../separator';
import { FilterConfig } from './types';

const FilterSelect = ({
  config,
  selectedValues,
  onSelect,
}: {
  config: FilterConfig;
  selectedValues: string[];
  onSelect: (values: string[]) => void;
}) => {
  const isMulti = config.type === 'multi-select';
  const selectedSet = new Set(selectedValues);

  const handleSelect = (value: string) => {
    const newValues = isMulti
      ? selectedSet.has(value)
        ? selectedValues.filter((v) => v !== value)
        : [...selectedValues, value]
      : [value];

    onSelect(newValues);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' className='border-dashed'>
          <PlusCircleIcon className='mr-2 h-4 w-4' />
          {config.label}
          {selectedValues.length > 0 && (
            <>
              <Separator orientation='vertical' className='mx-2 h-4' />
              <Badge
                variant='secondary'
                className='rounded-sm px-1 font-normal'
              >
                {selectedValues.length}
              </Badge>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0' align='start'>
        <Command>
          <CommandInput placeholder={`Filter ${config.label}...`} />
          <CommandList>
            <CommandEmpty>No results found</CommandEmpty>
            <CommandGroup>
              {config.options?.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => handleSelect(option.value)}
                >
                  <div
                    className={cn(
                      'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                      selectedSet.has(option.value)
                        ? 'bg-primary text-primary-foreground'
                        : 'opacity-50 [&_svg]:invisible',
                    )}
                  >
                    <CheckIcon className='h-4 w-4' />
                  </div>
                  {option.icon && (
                    <option.icon className='mr-2 h-4 w-4 text-muted-foreground' />
                  )}
                  <span>{option.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
            {selectedValues.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => onSelect([])}
                    className='justify-center text-center cursor-pointer'
                  >
                    Clear filter
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default FilterSelect;
