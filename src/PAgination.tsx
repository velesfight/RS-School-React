import React from 'react';

interface PaginationProps {
  currentPage: number;
  allPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  allPages,
  onPageChange,
}: PaginationProps): JSX.Element => {
  return (
    <div className="d-flex justify-content-between mt-3">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="btn btn-primary"
      >
        Prev
      </button>
      <span>
        Page {currentPage} of {allPages}
      </span>
      <button
        className="btn btn-primary"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === allPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
