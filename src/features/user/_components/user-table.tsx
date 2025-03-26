import { Pagination } from '@/components/pagination';
import DataTable from '@/components/ui/table/data-table';
import { Filters } from '@/components/ui/table/filters/filters';
import { FilterConfig } from '@/components/ui/table/filters/types';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { UserApi } from '../api';
import { columns } from './table-columns';

const UsersTable = () => {
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filterConfig: FilterConfig[] = [
    {
      key: 'search',
      label: 'Search',
      type: 'search',
      placeholder: 'Search users...',
    },
    {
      key: 'role',
      label: 'Role',
      type: 'multi-select',
      options: [
        { value: 'admin', label: 'Admin' },
        { value: 'user', label: 'User' },
      ],
    },
    {
      key: 'status',
      label: 'Status',
      type: 'single-select',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
      ],
    },
  ];

  const { data, isLoading } = useQuery({
    queryKey: ['users', { page, pageSize, filters, searchQuery }],
    queryFn: () =>
      UserApi.getUsers({
        page,
        limit: pageSize,
        search: searchQuery,
        ...filters,
      }),
  });

  const users = data?.success ? data.data.results : [];
  const totalResults = data?.success ? data.data.totalResults : 0;

  return (
    <div className='space-y-4'>
      <Filters
        filterConfig={filterConfig}
        filters={filters}
        searchQuery={searchQuery}
        onFilterChange={(key, values) => {
          setFilters((prev) => ({ ...prev, [key]: values }));
          setPage(1);
        }}
        onSearchChange={setSearchQuery}
        onResetAll={() => {
          setFilters({});
          setSearchQuery('');
          setPage(1);
        }}
      />

      <DataTable columns={columns} data={users} isLoading={isLoading} />

      <Pagination
        currentPage={page}
        totalItems={totalResults}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setPage(1);
        }}
      />
    </div>
  );
};

export default UsersTable;
