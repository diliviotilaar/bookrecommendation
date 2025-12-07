package middleware

import (
    "context"
    "net/http"
    "strings"
    "os"

    "github.com/golang-jwt/jwt/v5"
    "github.com/diliviotilaar/bookrecommendation/backend/api"
    "github.com/sirupsen/logrus"
)

type contextKey string
const ContextUserKey = contextKey("user")

// Custom JWT claims
type Claims struct {
    UserID   int    `json:"user_id"`
    Username string `json:"username"`
    jwt.RegisteredClaims
}

func JWTAuth(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

        auth := r.Header.Get("Authorization")
        if auth == "" {
            api.RequestErrorHandler(w, http.ErrNoCookie)
            return
        }

        parts := strings.SplitN(auth, " ", 2)
        if len(parts) != 2 || strings.ToLower(parts[0]) != "bearer" {
            api.RequestErrorHandler(w, http.ErrNoCookie)
            return
        }

        tokenString := parts[1]

        secret := os.Getenv("JWT_SECRET")
        if secret == "" {
            logrus.Error("JWT_SECRET not set")
            api.InternalErrorHandler(w)
            return
        }

        claims := &Claims{}

        token, err := jwt.ParseWithClaims(tokenString, claims, func(t *jwt.Token) (interface{}, error) {
            return []byte(secret), nil
        })

        if err != nil || !token.Valid {
            api.RequestErrorHandler(w, err)
            return
        }

        // Store claims in request context
        ctx := context.WithValue(r.Context(), ContextUserKey, claims)
        next.ServeHTTP(w, r.WithContext(ctx))
    })
}
