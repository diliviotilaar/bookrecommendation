package routes

import (
	"bytes"
	"encoding/json"
	"net/http"
)

type recommendationRequest struct {
    UserID int `json:"user_id"`
}

type BookRecommendation struct {
    ISBN  string  `json:"isbn"`
    Title string  `json:"title"`
	BookAuthor string `json:"book_author"`
	YearPublished string `json:"year_published"`
	Publisher string `json:"publisher"`
	ImageUrlM string `json:"image_url_m,omitempty"`
    Score float64 `json:"score"`
}

type recommendationResponse struct {
    UserID          int                 `json:"user_id"`
    Recommendations []BookRecommendation `json:"recommendations"`
}

func GetRecommendationsRoute(w http.ResponseWriter, r *http.Request) {
	var userRequest recommendationRequest

	if err := json.NewDecoder(r.Body).Decode(&userRequest); err != nil {
		http.Error(w, "invalid request", http.StatusBadRequest)
		return
	}
	
	reqBody, err := json.Marshal(userRequest)
	if err != nil {
		http.Error(w, "failed to marshal json", http.StatusInternalServerError)
		return
	}

	resp, err := http.Post("http://localhost:8001/predict", "application/json", bytes.NewBuffer(reqBody))
	if err != nil {
		http.Error(w, "failed to call ML service", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	var mlResponse recommendationResponse
	if err := json.NewDecoder(resp.Body).Decode(&mlResponse); err != nil {
		http.Error(w, "failed to decode ML service response", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(mlResponse)
	
}