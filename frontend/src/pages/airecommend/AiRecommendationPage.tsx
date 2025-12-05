import { useEffect, useState } from "react";
import NavBar from "../../component/NavBar";

interface Recommendation {
  isbn: string;
  title: string;
  book_author: string;
  year_published: string;
  publisher: string;
  image_url_m: string;
  score: number;
}

export default function AiRecommendationPage() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRecommendations = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/account/recommendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ user_id: 1 }),
      });

      const data = await res.json();
      setRecommendations(data.recommendations || []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="mx-auto my-auto p-6 bg-white w-full h-full">Loading recommendations...</div>
      </>
    );
  }

  return (
    <>
      <NavBar />
    <h1 className="text-3xl font-bold my-auto bg-white">AI Book Recommendations</h1>
    <div className="max-w-6xl mx-auto p-6">


        {recommendations.length === 0 && (
          <p className="text-gray-600">No recommendations found.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recommendations.map((book) => (
            <div
              key={book.isbn}
              className="bg-white border rounded-xl p-4 shadow hover:shadow-xl transition cursor-pointer"
            >
              <img
                src={book.image_url_m}
                alt={book.title}
                className="w-full h-52 object-cover rounded-md"
                onError={(e) =>
                  ((e.target as HTMLImageElement).src =
                    "https://via.placeholder.com/150?text=No+Image")
                }
              />

              <h2 className="mt-3 font-semibold text-lg leading-tight">
                {book.title}
              </h2>

              <p className="text-sm text-gray-600">{book.book_author}</p>

              <p className="text-xs mt-2">
                <span className="font-semibold">Publisher:</span>{" "}
                {book.publisher}
              </p>

              <p className="text-xs">
                <span className="font-semibold">Year:</span>{" "}
                {book.year_published}
              </p>

              <p className="text-sm font-semibold mt-3 text-green-600">
                ⭐ Score: {book.score.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
