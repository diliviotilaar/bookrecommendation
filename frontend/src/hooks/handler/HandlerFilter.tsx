import { useMemo, useState } from "react";
import type { Book } from "../../../types/Book";

export default function useHandlerFilter(books: Book[]) {
    const [filters, setFilters] = useState({
        year: "",
        author: "",
        publisher: "",
        sort: "asc",
        search: "", // <--- TAMBAH DI SINI
    });

    const filteredBooks = useMemo(() => {
        let result = [...books];

        // Search global
        if (filters.search) {
            const s = filters.search.toLowerCase();
            result = result.filter((b) =>
                b.title.toLowerCase().includes(s) ||
                b.author.toLowerCase().includes(s) ||
                b.publisher.toLowerCase().includes(s)
            );
        }

        if (filters.year) {
            result = result.filter((b) => b.year.toString() === filters.year);
        }

        if (filters.author) {
            result = result.filter((b) =>
                b.author.toLowerCase().includes(filters.author.toLowerCase())
            );
        }

        if (filters.publisher) {
            result = result.filter((b) =>
                b.publisher.toLowerCase().includes(filters.publisher.toLowerCase())
            );
        }

        // Sorting
        result.sort((a, b) =>
            filters.sort === "asc"
                ? a.title.localeCompare(b.title)
                : b.title.localeCompare(a.title)
        );

        return result;
    }, [books, filters]);

    return { filters, setFilters, filteredBooks };
}
