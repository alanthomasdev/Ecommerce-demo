'use client';
import React from 'react';

interface PaginationProps {
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  currentPage,
  itemsPerPage,
  onPageChange,
}) => {
  const numberOfPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const handleNextPage = () => {
    onPageChange(Math.min(currentPage + 1, numberOfPages));
  };

  const handlePrevPage = () => {
    onPageChange(Math.max(currentPage - 1, 1));
  };

  const renderPages = () => {
    const pages = [];
    for (let i = 1; i <= numberOfPages; i++) {
      pages.push(
        <li key={i} onClick={() => handlePageClick(i)}>
          <button
            className={`flex items-center justify-center px-3 h-8 leading-tight border rounded-md mx-1
              ${
                currentPage === i
                  ? 'text-white bg-[#F08221] border-blue-500'
                  : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
              }`}
          >
            {i}
          </button>
        </li>
      );
    }
    return pages;
  };

  return (
    <div className='flex justify-center mt-6'>
      <nav aria-label='Pagination Navigation'>
        <ul className='inline-flex -space-x-px text-sm'>
          <li onClick={handlePrevPage}>
            <button className='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>
              Previous
            </button>
          </li>
          {renderPages()}
          <li onClick={handleNextPage}>
            <button className='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
