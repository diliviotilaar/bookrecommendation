import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import NavBar from "../../component/NavBar";
import BookItemList from "../../component/BookItemList";
import Pagination from "../../component/Pagination";
import useHandlerFilter from "../../hooks/handler/HandlerFilter";

import type { Book } from "../../../types/Book";

export default function BookPage() {
    const navigate = useNavigate();
    const [books, setBooks] = useState<Book[]>([]);
    const [userRatings, setUserRatings] = useState<Record<string, number>>({});
    const [currentPage, setCurrentPage] = useState(1);
    const [searchParams] = useSearchParams();
    const urlSearch = searchParams.get("search") || "";
    const booksPerPage = 10;
    const token = localStorage.getItem("token");
    const userId = Number(localStorage.getItem("userId"));
    const { filters, setFilters, filteredBooks } = useHandlerFilter(books);

    // Fetch books
    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }

        const fetchBooks = async () => {
            try {
                const res = await fetch("http://localhost:8000/account/books", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (res.status === 401) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("userId");
                    navigate("/login");
                    return;
                }

                const data = await res.json();
                const mappedBooks: Book[] = data.map((b: any) => ({
                    id: b.isbn,
                    title: b.book_title,
                    author: b.book_author,
                    year: Number(b.year_published),
                    publisher: b.publisher,
                    imageUrl: b.image_url_l || b.image_url_m || b.image_url_s,
                }));

                setBooks(mappedBooks);
            } catch (err) {
                console.error("Fetch error:", err);
            }
        };

        fetchBooks();
    }, [token, navigate]);

    // Fetch user ratings
    useEffect(() => {
        if (!token) return;

        const fetchRatings = async () => {
            try {
                const res = await fetch("http://localhost:8000/account/getratings", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!res.ok) {
                    console.error("Failed to load user ratings");
                    return;
                }

                const data = await res.json();
                const map: { [isbn: string]: number } = {};
                data.forEach((r: any) => {
                    map[r.isbn] = r.ratings; // backend returns 'ratings' field
                });

                setUserRatings(map);
            } catch (err) {
                console.error("Error fetching ratings:", err);
            }
        };

        fetchRatings();
    }, [token]);

    useEffect(() => {
        if (urlSearch) {
            setFilters((prev) => ({ ...prev, search: urlSearch }));
            setCurrentPage(1);
        }
    }, [urlSearch, setFilters]);

    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
    const startIndex = (currentPage - 1) * booksPerPage;
    const currentBooks = filteredBooks.slice(startIndex, startIndex + booksPerPage);

    return (
        <div style={{ width: "100%", minHeight: "100vh", background: "#f7f7f7" }}>
            <NavBar />

            <div style={{ maxWidth: 900, margin: "40px auto", padding: "0 20px" }}>
                <h2 style={{ marginBottom: 20 }}>All Books</h2>

                {/* Filter Section */}
                <div style={{ display: "flex", gap: 15, marginBottom: 20, flexWrap: "wrap" }}>
                    <select
                        value={filters.year}
                        onChange={(e) => { setFilters({ ...filters, year: e.target.value }); setCurrentPage(1); }}
                        style={{ padding: "8px 12px", borderRadius: "4px", border: "1px solid #ddd" }}
                    >
                        <option value="">All Years</option>
                        {Array.from(new Set(books.map((b) => b.year))).sort((a, b) => b - a).map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>

                    <select
                        value={filters.sort}
                        onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                        style={{ padding: "8px 12px", borderRadius: "4px", border: "1px solid #ddd" }}
                    >
                        <option value="asc">Title A-Z</option>
                        <option value="desc">Title Z-A</option>
                    </select>

                    <input
                        type="text"
                        placeholder="Filter by author..."
                        value={filters.author}
                        onChange={(e) => { setFilters({ ...filters, author: e.target.value }); setCurrentPage(1); }}
                        style={{ padding: "8px 12px", borderRadius: "4px", border: "1px solid #ddd", flex: 1, minWidth: 150 }}
                    />

                    <input
                        type="text"
                        placeholder="Filter by publisher..."
                        value={filters.publisher}
                        onChange={(e) => { setFilters({ ...filters, publisher: e.target.value }); setCurrentPage(1); }}
                        style={{ padding: "8px 12px", borderRadius: "4px", border: "1px solid #ddd", flex: 1, minWidth: 150 }}
                    />

                    <button
                        onClick={() => { setFilters({ year: "", author: "", publisher: "", sort: "asc" }); setCurrentPage(1); }}
                        style={{ padding: "8px 16px", borderRadius: "4px", background: "#dc3545", color: "white", border: "none", cursor: "pointer" }}
                    >
                        Clear
                    </button>
                </div>

                {/* Books List */}
                {currentBooks.length > 0 ? (
                    currentBooks.map((book) => (
                        <BookItemList
                            key={book.id}
                            book={book}
                            userId={userId}
                            userRating={userRatings[book.id] || 0}
                        />
                    ))
                ) : (
                    <p>No books found matching your filters.</p>
                )}

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
}
