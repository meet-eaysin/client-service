import { useCallback, useState } from "react";

interface Filters {
  [key: string]: (string | null)[];
}

export function useDataTableFilters() {
  const [filters, setFilters] = useState<Filters>({});
  const [searchQuery, setSearchQueryState] = useState<string | null>(null);
  const [page, setPageState] = useState<number>(1);

  const isAnyFilterActive =
    Object.values(filters).some((value) => value && value.length > 0) ||
    !!searchQuery;

  const updateFilter = (key: string, value: string | null) => {
    setFilters((prev) => {
      const currentValues = prev[key] || [];

      if (value && !currentValues.includes(value)) {
        return { ...prev, [key]: [...currentValues, value] };
      } else if (currentValues.includes(value)) {
        return {
          ...prev,
          [key]: currentValues.filter((v) => v !== value),
        };
      }

      return prev;
    });
  };

  const resetAllFilters = useCallback(() => {
    setFilters({});
    setSearchQueryState(null);
    setPageState(1);
  }, []);

  const resetFilterByKey = useCallback((key: string) => {
    setFilters((prev) => ({ ...prev, [key]: [] }));
  }, []);

  const setSearchQuery = useCallback(
    async (query: string | null) => {
      setSearchQueryState(query);
      setPageState(1);
      return new URLSearchParams({
        ...filters,
        search: query ?? "",
        page: "1",
      });
    },
    [filters]
  );

  const setPage = useCallback(
    async (pageNumber: number | null) => {
      setPageState(pageNumber || 1);
      return new URLSearchParams({
        ...filters,
        search: searchQuery ?? "",
        page: (pageNumber || 1).toString(),
      });
    },
    [filters, searchQuery]
  );

  return {
    filters,
    searchQuery,
    page,
    isAnyFilterActive,
    updateFilter,
    resetAllFilters,
    resetFilterByKey,
    setSearchQuery,
    setPage,
  };
}
