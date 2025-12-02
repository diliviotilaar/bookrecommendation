import { useNavigate } from "react-router-dom";
import type { Book } from "../../types/Book";
import Rating from "../hooks/handler/Rating";
import useSubmitRating from "../hooks/handler/HandlerBook"; // <-- import hook

function BookItemList({ book, userId }: { book: Book; userId: number }) {
  const navigate = useNavigate();

  // call the hook to get the function (was returning void before)
  const submitRating = useSubmitRating(userId);

  return (
    <div
      onClick={() => navigate(`/books/${book.id}`)}
      style={{
        display: "flex",
        gap: 20,
        padding: 10,
        borderBottom: "1px solid #ddd",
        cursor: "pointer",
      }}
    >
      <img
        src={book.imageUrl}
        alt={book.title}
        style={{ width: 70, height: 100, objectFit: "cover" }}
      />

      <div>
        <h3>{book.title}</h3>
        <p>{book.author}</p>
        <p>
          {book.year} — {book.publisher} 
        </p>
      </div>

      {/* Kirimkan userId, ISBN dan submitRating ke komponen Rating */}
      <Rating
        userId={userId} // Mengirimkan userId ke Rating
        isbn={book.id} // Mengirimkan ISBN dari book
        ratingBook={submitRating} // now has correct type (isbn, rating) => void
      />
    </div>
  );
}

export default BookItemList;
