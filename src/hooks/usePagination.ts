import { useState, useMemo } from 'react';

interface PaginationOptions {
  data: any[];
  itemsPerPage: number;
}

export const usePagination = ({ data, itemsPerPage }: PaginationOptions) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return data.slice(start, end);
  }, [data, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    currentPage,
    totalPages,
    paginatedData,
    handlePageChange,
  };
};