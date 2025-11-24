package middleware

import (
	"context"
	"errors"
	"net/http"

	"github.com/diliviotilaar/bookrecommendation/backend/api"
	"github.com/diliviotilaar/bookrecommendation/backend/internal/tools"
	"github.com/sirupsen/logrus"
)

var UnauthorizedError = errors.New("invalid username or password")

func Authorization(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		// Read headers
		username := r.Header.Get("Authorization-Username")
		password := r.Header.Get("Authorization-Password")

		if username == "" || password == "" {
			logrus.Error("missing auth headers")
			api.RequestErrorHandler(w, UnauthorizedError)
			return
		}

		// Query the database for user info
		var dbPassword string
		err := tools.DB.QueryRow(
			context.Background(),
			`SELECT password FROM "user" WHERE username = $1`,
			username,
		).Scan(&dbPassword)

		if err != nil {
			logrus.Error("username not found")
			api.RequestErrorHandler(w, UnauthorizedError)
			return
		}

		// Compare password
		if dbPassword != password {
			logrus.Error("invalid password")
			api.RequestErrorHandler(w, UnauthorizedError)
			return
		}

		// Auth OK → continue
		next.ServeHTTP(w, r)
	})
}
