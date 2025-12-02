import { useState, useMemo } from "react";
import type { Book } from "../../../types/Book";

export default function useHandlerFilter(books: Book[]) {
  const [filters, setFilters] = useState({
    year: "",
    author: "",
    publisher: "",
    sort: "asc", // "asc" or "desc"
  });

  const filteredBooks = useMemo(() => {
    let filtered = books.filter((book) => {
      const yearMatch = !filters.year || book.year.toString() === filters.year;
      const authorMatch = !filters.author || book.author.toLowerCase().includes(filters.author.toLowerCase());
      const publisherMatch = !filters.publisher || book.publisher.toLowerCase().includes(filters.publisher.toLowerCase());

      return yearMatch && authorMatch && publisherMatch;
    });

    // Sort by title
    filtered.sort((a, b) => {
      if (filters.sort === "asc") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });

    return filtered;
  }, [books, filters]);

  const uniqueYears = Array.from(new Set(books.map((b) => b.year))).sort((a, b) => b - a);
  const uniqueAuthors = Array.from(new Set(books.map((b) => b.author))).sort();
  const uniquePublishers = Array.from(new Set(books.map((b) => b.publisher))).sort();

  return {
    filters,
    setFilters,
    filteredBooks,
    uniqueYears,
    uniqueAuthors,
    uniquePublishers,
  };
}