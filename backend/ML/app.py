from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
import joblib

from database import get_db
from models import Books
from typing import List

app = FastAPI()

pred_model = joblib.load("model.pkl")

class PredictRequest(BaseModel):
    user_id: int
    n: int = 10 


class BookRecommendation(BaseModel):
    isbn: str
    title: str
    book_author: str
    year_published: str
    publisher: str
    image_url_m: str
    score: float


class PredictResponse(BaseModel):
    user_id: int
    recommendations: List[BookRecommendation]

@app.post("/predict", response_model=PredictResponse)
def recommend_books(req: PredictRequest, db: Session = Depends(get_db)):
    user_id = req.user_id
    n = req.n

    books = db.query(Books).all()

    if not books:
        raise HTTPException(status_code=404, detail="No books in database")
    
    predictions = []
    for book in books:
        pred_score = pred_model.predict(str(user_id), str(book.isbn)).est
        predictions.append((book.isbn, book.book_title, book.book_author, book.year_published, book.publisher, book.image_url_m, pred_score))

    predictions.sort(key=lambda x: x[2], reverse=True)
    top_n = predictions[:n]

    result = [
        BookRecommendation(isbn=isbn, title=title, book_author=book_author, year_published=year_published, publisher=publisher, image_url_m=image_url_m, score=score)
        for isbn, title, book_author, year_published, publisher, image_url_m, score in top_n
    ]

    return PredictResponse(
        user_id=user_id,
        recommendations=result
    )