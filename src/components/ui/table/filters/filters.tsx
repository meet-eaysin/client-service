import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import debounce from 'lodash.debounce';
import { X } from 'lucide-react';
import FilterSelect from './FilterSelect';
import { FilterConfig } from './types';

interface FiltersProps {
  filters: Record<string, string[]>;
  searchQuery?: string;
  onFilterChange: (key: string, values: string[]) => void;
  onSearchChange: (value: string) => void;
  onResetAll: () => void;
  filterConfig: FilterConfig[];
  debounceTime?: number;
}

export const Filters = ({
  filters,
  searchQuery = '',
  onFilterChange,
  onSearchChange,
  onResetAll,
  filterConfig,
  debounceTime = 300,
}: FiltersProps) => {
  const debouncedSearch = debounce(onSearchChange, debounceTime);
  const hasActiveFilters = Object.values(filters).some(
    (values) => values.length > 0,
  );

  return (
    <div className='flex flex-wrap items-center gap-2'>
      {filterConfig.map((config) => {
        if (config.type === 'search') {
          return (
            <Input
              key={config.key}
              placeholder={config.placeholder || 'Search...'}
              defaultValue={searchQuery}
              onChange={(e) => debouncedSearch(e.target.value)}
              className='w-full md:max-w-sm'
            />
          );
        }

        return (
          <FilterSelect
            key={config.key}
            config={config}
            selectedValues={filters[config.key] || []}
            onSelect={(values) => onFilterChange(config.key, values)}
          />
        );
      })}

      {(hasActiveFilters || searchQuery) && (
        <Button
          variant='ghost'
          onClick={onResetAll}
          className='h-8 px-2 lg:px-3'
        >
          Reset All
          <X className='ml-2 h-4 w-4' />
        </Button>
      )}
    </div>
  );
};
