import { useState, useEffect } from "react";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import type { RatingProps } from "../../../types/RatingProps";

export default function Rating({ isbn, initialRating, ratingBook }: RatingProps) {
  // Convert 1–10 → UI scale 0–5
  const [rating, setRating] = useState(initialRating ? initialRating / 2 : 0);
  const [hover, setHover] = useState<number | null>(null);
  const [pendingRating, setPendingRating] = useState(rating);

  useEffect(() => {
    setRating(initialRating / 2);
    setPendingRating(initialRating / 2);
  }, [initialRating]);

  const handleStarClick = (num: number) => {
    const fullValue = num;        // 1–5
    const halfValue = num - 0.5;  // 0.5–4.5

    // Jika klik bintang yang sama → toggle full ↔ half
    if (pendingRating === fullValue) {
      setPendingRating(halfValue);
    } else {
      setPendingRating(fullValue);
    }
  };

  const handleSubmit = () => {
    const rating10 = Math.round(pendingRating * 2); // convert to 1–10
    setRating(pendingRating);
    ratingBook(isbn, rating10);
  };

  const display = hover ?? pendingRating;

  return (
    <div>
      <div style={{ display: "flex", gap: 4 }}>
        {[1, 2, 3, 4, 5].map((num) => {
          const full = display >= num;
          const half = !full && display >= num - 0.5;

          return (
            <span
              key={num}
              onMouseEnter={() => setHover(num)}
              onMouseLeave={() => setHover(null)}
              onClick={() => handleStarClick(num)}
              style={{ cursor: "pointer", fontSize: 26 }}
            >
              {full ? (
                <FaStar color="gold" />
              ) : half ? (
                <FaStarHalfAlt color="gold" />
              ) : (
                <FaRegStar color="gray" />
              )}
            </span>
          );
        })}
      </div>

      <button
        style={{
          marginTop: 8,
          padding: "6px 12px",
          background: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
        }}
        onClick={handleSubmit}
      >
        Submit Rating
      </button>
    </div>
  );
}
