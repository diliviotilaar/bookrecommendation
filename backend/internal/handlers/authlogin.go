package handlers

import (
	"context"
	"encoding/json"
	"net/http"
	"os"
	"strconv"
	"time"

	"golang.org/x/crypto/bcrypt"
	"github.com/golang-jwt/jwt/v5"
	"github.com/diliviotilaar/bookrecommendation/backend/internal/tools"
	"github.com/sirupsen/logrus"
)

type loginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type tokenResponse struct {
	Token string `json:"token"`
}

// simple custom claims
type MyClaims struct {
	UserID   int    `json:"user_id"`
	Username string `json:"username"`
	jwt.RegisteredClaims
}

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	var body loginRequest
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, "invalid body", http.StatusBadRequest)
		return
	}
	if body.Username == "" || body.Password == "" {
		http.Error(w, "username and password required", http.StatusBadRequest)
		return
	}

	// DEBUG ENV
	logrus.Println("DEBUG JWT_SECRET:", os.Getenv("JWT_SECRET"))

	var dbPassword string
	var userID int

	err := tools.DB.QueryRow(context.Background(),
		`SELECT user_id, password FROM "user" WHERE username = $1`,
		body.Username,
	).Scan(&userID, &dbPassword)
	if err != nil {
		logrus.Error("user lookup error:", err)
		http.Error(w, "invalid credentials", http.StatusUnauthorized)
		return
	}

	// compare bcrypt
	if err := bcrypt.CompareHashAndPassword([]byte(dbPassword), []byte(body.Password)); err != nil {
		http.Error(w, "invalid credentials", http.StatusUnauthorized)
		return
	}

	// create JWT
	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		logrus.Error("JWT_SECRET unset")
		http.Error(w, "server error", http.StatusInternalServerError)
		return
	}

	// expiry from env or default
	expMin := 60
	if v := os.Getenv("JWT_EXPIRE_MINUTES"); v != "" {
		if n, err := strconv.Atoi(v); err == nil {
			expMin = n
		}
	}

	claims := MyClaims{
		UserID:   userID,
		Username: body.Username,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Minute * time.Duration(expMin))),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			Issuer:    "book-recom-backend",
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	ss, err := token.SignedString([]byte(secret))
	if err != nil {
		logrus.Error("jwt sign error:", err)
		http.Error(w, "server error", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(tokenResponse{Token: ss})
}