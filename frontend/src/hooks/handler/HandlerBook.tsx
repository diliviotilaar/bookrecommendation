import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function useSubmitRating(userId: number) {
  const navigate = useNavigate();

  const submitRating = useCallback(
    async (isbn: string, rating: number) => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:8000/account/ratings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            user_id: userId,
            isbn,
            rating,
          }),
        });

        if (res.status === 401) {
          console.warn("Token invalid / expired, tapi JANGAN logout otomatis!");
          return;
        }

        if (!res.ok) {
          const errText = await res.text();
          console.error("Rating failed:", errText);
          return;
        }

        const data = await res.json();
        console.log("Rating saved:", data);
      } catch (error) {
        console.error("Error sending rating:", error);
      }
    },
    [userId, navigate]
  );

  return submitRating;
}

