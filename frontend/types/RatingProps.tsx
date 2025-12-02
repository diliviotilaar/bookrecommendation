export interface RatingProps {
  userId: number;
  isbn: string;
  ratingBook: (isbn: string, rating: number) => void;
}
