package routes

import (
	"context"
	"encoding/json"
	"net/http"

	"github.com/diliviotilaar/bookrecommendation/backend/internal/tools"
	"github.com/sirupsen/logrus"
)

type ratingRequest struct {
	UserID int `json:"user_id"`
	Isbn string `json:"isbn"`
	Rating int `json:"rating"`
}

func InsertRatingRoute(w http.ResponseWriter, r *http.Request) {
	var userRating ratingRequest
	if err := json.NewDecoder(r.Body).Decode(&userRating); err != nil {
		http.Error(w, "invalid rating", http.StatusBadRequest)
		return
	}
	if userRating.Rating < 0  || userRating.Rating > 10 {
		http.Error(w, "please rate inside the range given", http.StatusBadRequest)
		return
	}

	// insert user
	_, err := tools.DB.Exec(context.Background(),
		`INSERT INTO "ratings" (user_id, isbn, ratings) VALUES ($1, $2, $3)`,
		userRating.UserID, userRating.Isbn, userRating.Rating, 
	)
	if err != nil {
		logrus.Error("insert rating error:", err)
		http.Error(w, "could not insert user rating", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"message": "ratings inserted"})
}