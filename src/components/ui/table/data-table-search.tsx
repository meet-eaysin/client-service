import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import debounce from "lodash.debounce";
import { useEffect, useRef, useTransition } from "react";

interface DataTableSearchProps {
  searchKey: string;
  searchQuery: string;
  setSearchQuery: (value: string | null) => void;
  setPage: (value: number | null) => void;
}

export function DataTableSearch({
  searchKey,
  searchQuery,
  setSearchQuery,
  setPage,
}: DataTableSearchProps) {
  const [isLoading, startTransition] = useTransition();
  const debouncedSearch = useRef(
    debounce((value: string) => {
      startTransition(() => {
        setSearchQuery(value);
        setPage(1);
      });
    }, 300)
  ).current;

  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  const handleInputChange = (value: string) => {
    debouncedSearch(value);
  };

  return (
    <Input
      placeholder={`Search ${searchKey}...`}
      defaultValue={searchQuery ?? ""}
      onChange={(e) => handleInputChange(e.target.value)}
      className={cn("w-full md:max-w-sm", isLoading && "animate-pulse")}
      aria-label={`Search ${searchKey}`}
    />
  );
}
