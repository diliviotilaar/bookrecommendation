package routes

import (
	"context"
	"net/http"
	"encoding/json"

	"github.com/diliviotilaar/bookrecommendation/backend/internal/tools"
	"github.com/sirupsen/logrus"
)

type Books struct{
	Isbn	string `json:"isbn"`
	BookTitle string `json:"book_title"`
	BookAuthor string `json:"book_author"`
	YearPublished string `json:"year_published"`
	Publisher string `json:"publisher"`
	ImageURLS string `json:"image_url_s,omitempty"`
	ImageURLM string `json:"image_url_m,omitempty"`
	ImageURLL string `json:"image_url_l,omitempty"`
}

func GetAllBooksRoute(w http.ResponseWriter, r *http.Request) {
	rows, err := tools.DB.Query(context.Background(),
		`SELECT isbn, book_title, book_author, year_published, publisher, image_url_s, image_url_m, image_url_l FROM books`,
	)
	if err != nil {
		logrus.Error("error selecting books:", err)
		http.Error(w, "Could not retrieve books", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var books []Books

	for rows.Next() {
		var b Books
		err := rows.Scan(
			&b.Isbn,
			&b.BookTitle,
			&b.BookAuthor,
			&b.YearPublished,
			&b.Publisher,
			&b.ImageURLS,
			&b.ImageURLM,
			&b.ImageURLL,
		)
		if err != nil {
			logrus.Error("row scan error:", err)
			continue
		}
		books = append(books, b)
	}

	// Return JSON
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(books)
}