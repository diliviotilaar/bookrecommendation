import { useState, useEffect } from "react";
import type { RatingProps } from "../../../types/RatingProps";

function Rating({ userId, isbn, initialRating, ratingBook }: RatingProps) {
  const [rating, setRating] = useState<number>(initialRating || 0);

  useEffect(() => {
    setRating(initialRating); // update saat prop berubah
  }, [initialRating]);

  const handleRate = (value: number) => {
    setRating(value);
    ratingBook(isbn, value);
  };

  return (
    <div style={{ display: "flex", gap: "4px" }}>
      {[1, 2, 3, 4, 5].map((num) => (
        <span
          key={num}
          onClick={(e) => {
            e.stopPropagation();
            handleRate(num);
          }}
          style={{
            cursor: "pointer",
            color: num <= rating ? "gold" : "gray",
            fontSize: "20px",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default Rating;
