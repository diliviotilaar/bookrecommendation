import { useNavigate } from "react-router-dom";
import type { Book } from "../../types/Book";
import Rating from "../hooks/handler/Rating";
import useSubmitRating from "../hooks/handler/HandlerBook";

function BookItemList({ book, userId, userRating }: { book: Book; userId: number; userRating: number }) {
  const navigate = useNavigate();
  const submitRating = useSubmitRating(userId);

  return (
    <div
      style={{
        display: "flex",
        gap: 20,
        padding: 10,
        borderBottom: "1px solid #ddd",
        cursor: "pointer",
        alignItems: "flex-start",
      }}
    >
      <img
        src={book.imageUrl}
        alt={book.title}
        style={{ width: 70, height: 100, objectFit: "cover", flexShrink: 0 }}
      />

      <div style={{ flex: 1 }}>
        <h3 style={{ margin: "0 0 8px 0" }}>{book.title}</h3>
        <p style={{ margin: "0 0 4px 0" }}>{book.author}</p>
        <p style={{ margin: 0 }}>{book.year} — {book.publisher}</p>
      </div>

      <div
        onClick={(e) => e.stopPropagation()}
        style={{ flexShrink: 0, paddingTop: "4px" }}
      >
        <Rating
          userId={userId}
          isbn={book.id}
          initialRating={userRating}
          ratingBook={submitRating}
        />
      </div>
    </div>
  );
}

export default BookItemList;
