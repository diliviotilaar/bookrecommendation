package routes

import (
	"context"
	"net/http"
	"encoding/json"

	"github.com/diliviotilaar/bookrecommendation/backend/internal/tools"
	"github.com/diliviotilaar/bookrecommendation/backend/internal/middleware"
	"github.com/sirupsen/logrus"
)

type GetUserRating struct{
	Isbn	string `json:"isbn"`
	Ratings int `json:"ratings"`
}

func GetUserRatingsRoute(w http.ResponseWriter, r *http.Request) {
	claims, ok := r.Context().Value(middleware.ContextUserKey).(*middleware.Claims)
    if !ok {
        http.Error(w, "unauthorized", http.StatusUnauthorized)
        return
    }

    userID := claims.UserID

	rows, err := tools.DB.Query(context.Background(),
		`SELECT isbn, ratings FROM ratings where user_id=$1`, 
		userID,
	)
	if err != nil {
		logrus.Error("error selecting ratings:", err)
		http.Error(w, "Could not retrieve ratings", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var ratings []GetUserRating

	for rows.Next() {
		var b GetUserRating
		err := rows.Scan(
			&b.Isbn,
			&b.Ratings,
		)
		if err != nil {
			logrus.Error("row scan error:", err)
			continue
		}

		ratings = append(ratings, b)
	}

	// Return JSON
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(ratings)
}