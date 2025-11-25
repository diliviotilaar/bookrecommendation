package handlers

import (
	"context"
	"encoding/json"
	"net/http"

	"golang.org/x/crypto/bcrypt"

	"github.com/diliviotilaar/bookrecommendation/backend/internal/tools"
	"github.com/sirupsen/logrus"
)

type registerRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
	Age      int    `json:"age,omitempty"`
	Location string `json:"location,omitempty"`
}

func RegisterHandler(w http.ResponseWriter, r *http.Request) {
	var body registerRequest
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, "invalid body", http.StatusBadRequest)
		return
	}
	if body.Username == "" || body.Password == "" {
		http.Error(w, "username and password required", http.StatusBadRequest)
		return
	}

	// hash password
	hashed, err := bcrypt.GenerateFromPassword([]byte(body.Password), bcrypt.DefaultCost)
	if err != nil {
		logrus.Error("bcrypt error:", err)
		http.Error(w, "server error", http.StatusInternalServerError)
		return
	}

	// insert user
	_, err = tools.DB.Exec(context.Background(),
		`INSERT INTO "user" (username, password, age, location) VALUES ($1, $2, $3, $4)`,
		body.Username, string(hashed), body.Age, body.Location,
	)
	if err != nil {
		logrus.Error("insert user error:", err)
		http.Error(w, "could not create user", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"message": "user created"})
}
