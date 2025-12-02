import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import NavBar from "../../component/NavBar";
import BookItemList from "../../component/BookItemList";
import Pagination from "../../component/Pagination";

import type { Book } from "../../../types/Book";

export default function Home() {
    const navigate = useNavigate();
    const [books, setBooks] = useState<Book[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const booksPerPage = 10;

    // Ambil token dari localStorage
    const userId = Number(localStorage.getItem("userId") || 0);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }

        const fetchBooks = async () => {
            try {
                const res = await fetch("http://localhost:8000/account/books", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!res.ok) {
                    throw new Error("Gagal fetch data");
                }

                const data = await res.json();
                setBooks(data);

            } catch (err) {
                console.error("Fetch error:", err);
            }
        };

        fetchBooks();
    }, [token, navigate]);


    // Pagination logic
    const totalPages = Math.ceil(books.length / booksPerPage);
    const startIndex = (currentPage - 1) * booksPerPage;
    const currentBooks = books.slice(startIndex, startIndex + booksPerPage);


    return (
        <div style={{ width: "100%", minHeight: "100vh", background: "#f7f7f7" }}>
            <NavBar />

            <div style={{ maxWidth: 900, margin: "40px auto", padding: "0 20px" }}>
                <h2 style={{ marginBottom: 20 }}>All Books</h2>

                {currentBooks.map((book) => (
                    <BookItemList 
                        key={book.id} 
                        book={book}
                        userId={userId}      // ← FIX WAJIB
                    />
                ))}
                   
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
}
