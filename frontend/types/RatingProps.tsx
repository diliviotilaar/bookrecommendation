export interface RatingProps {
  userId: number;
  isbn: string;
  initialRating: number;             // <-- tambah ini
  ratingBook: (isbn: string, rating: number) => void;
}
