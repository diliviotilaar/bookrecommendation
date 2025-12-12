import React from "react";
import "./styles/pagination.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers = [];
  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(totalPages, currentPage + 1);

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-container">
      <button
        className="pagination-btn"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >
        &laquo;
      </button>

      <button
        className="pagination-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lsaquo;
      </button>

      {pageNumbers.map((num) => (
        <button
          key={num}
          className={`pagination-btn ${num === currentPage ? "active" : ""}`}
          onClick={() => onPageChange(num)}
        >
          {num}
        </button>
      ))}

      <button
        className="pagination-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &rsaquo;
      </button>

      <button
        className="pagination-btn"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        &raquo;
      </button>
    </div>
  );
};

export default Pagination;
