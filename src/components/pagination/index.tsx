import defaultConfig from "@/config/default";
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface PaginationProps {
  totalItems: number;
  paginationState: {
    pageIndex: number;
    pageSize: number;
  };
  pageSizeOptions?: number[];
  handlePageSizeChange: (pageSize: number) => void;
  handlePageChange: (pageIndex: number) => void;
  pageSize: number;
}

const Pagination = ({
  totalItems,
  paginationState,
  pageSizeOptions = defaultConfig.pageSizeOptions,
  handlePageSizeChange,
  handlePageChange,
  pageSize,
}: PaginationProps) => {
  const pageCount = Math.ceil(totalItems / pageSize);

  return (
    <div className="flex flex-col items-center justify-end gap-2 space-x-2 py-4 sm:flex-row">
      <div className="flex w-full items-center justify-between">
        <div className="flex-1 text-sm text-muted-foreground">
          {totalItems > 0 ? (
            <>
              Showing {paginationState.pageIndex * paginationState.pageSize + 1}{" "}
              to{" "}
              {Math.min(
                (paginationState.pageIndex + 1) * paginationState.pageSize,
                totalItems
              )}{" "}
              of {totalItems} entries
            </>
          ) : (
            "No entries found"
          )}
        </div>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
          <div className="flex items-center space-x-2">
            <p className="whitespace-nowrap text-sm font-medium">
              Rows per page
            </p>
            <Select
              value={`${paginationState.pageSize}`}
              onValueChange={(value) => handlePageSizeChange(Number(value))}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={paginationState.pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {pageSizeOptions?.map((size) => (
                  <SelectItem key={size} value={`${size}`}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex w-full items-center justify-between gap-2 sm:justify-end">
        <div className="flex w-[150px] items-center justify-start text-sm font-medium">
          {totalItems > 0 ? (
            <>
              Page {paginationState.pageIndex + 1} of {pageCount}
            </>
          ) : (
            "No pages"
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Button
            aria-label="Go to first page"
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => handlePageChange(0)}
            disabled={paginationState.pageIndex === 0}
          >
            <DoubleArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to previous page"
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => handlePageChange(paginationState.pageIndex - 1)}
            disabled={paginationState.pageIndex === 0}
          >
            <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to next page"
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => handlePageChange(paginationState.pageIndex + 1)}
            disabled={paginationState.pageIndex >= pageCount - 1}
          >
            <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to last page"
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => handlePageChange(pageCount - 1)}
            disabled={paginationState.pageIndex >= pageCount - 1}
          >
            <DoubleArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
