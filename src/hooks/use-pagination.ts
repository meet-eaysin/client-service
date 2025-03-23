import defaultConfig from "@/config/default";
import { useState } from "react";

const usePagination = ({
  pageSizeOptions = defaultConfig.pageSizeOptions,
}: {
  pageSizeOptions?: number[];
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(pageSizeOptions[0]);

  const paginationState = {
    pageIndex: currentPage - 1,
    pageSize: pageSize,
  };

  const handlePageChange = (pageIndex: number) => {
    setCurrentPage(pageIndex + 1);
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };

  return {
    handlePageChange,
    handlePageSizeChange,
    paginationState,
    currentPage,
    pageSize,
  };
};

export default usePagination;
