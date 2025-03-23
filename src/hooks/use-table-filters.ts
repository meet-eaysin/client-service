import { useCallback, useState } from "react";

interface Filters {
  [key: string]: string | null;
}

export function useTableFilter() {
  const [filters, setFilters] = useState<Filters>({});
  const [searchQuery, setSearchQueryState] = useState<string | null>(null);
  const [page, setPageState] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortType, setSortType] = useState<"asc" | "desc">("asc");

  const isAnyFilterActive =
    Object.values(filters).some((value) => value !== null) ||
    !!searchQuery ||
    !!sortBy ||
    sortType !== "asc";

  const updateFilter = useCallback(
    (filterKey: string, value: string | null) => {
      setFilters((prev) => ({
        ...prev,
        [filterKey]: value,
      }));
    },
    []
  );

  const resetFilters = useCallback(() => {
    setFilters({});
    setSearchQueryState(null);
    setPageState(1);
    setSortBy(null);
    setSortType("asc");
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
        sortBy: sortBy ?? "",
        sortType: sortType,
      });
    },
    [filters, searchQuery, sortBy, sortType]
  );

  const handleSortChange = useCallback((column: string) => {
    setSortBy((prevSortBy) => {
      if (prevSortBy === column) {
        setSortType((prevSortType) =>
          prevSortType === "asc" ? "desc" : "asc"
        );
        return column;
      }
      setSortType("asc");
      return column;
    });
  }, []);

  return {
    filters,
    searchQuery,
    page,
    isAnyFilterActive,
    updateFilter,
    resetFilters,
    sortBy,
    sortType,
    handleSortChange,
    setSearchQuery,
    setPage,
  };
}
