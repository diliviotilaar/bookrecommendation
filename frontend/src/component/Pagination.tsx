import React from "react";

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
    <div style={{ display: "flex", gap: "8px", marginTop: "20px" }}>
      {/* First Page */}
      <button onClick={() => onPageChange(1)} disabled={currentPage === 1}>
        {"<<"}
      </button>

      {/* Prev Page */}
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        {"<"}
      </button>

      {/* Page Numbers */}
      {pageNumbers.map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          style={{
            padding: "5px 10px",
            background: num === currentPage ? "#4f46e5" : "#e5e7eb",
            color: num === currentPage ? "#fff" : "#000",
            borderRadius: "4px",
            border: "none",
            cursor: "pointer",
          }}
        >
          {num}
        </button>
      ))}

      {/* Next Page */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {">"}
      </button>

      {/* Last Page */}
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        {">>"}
      </button>
    </div>
  );
};

export default Pagination;
    