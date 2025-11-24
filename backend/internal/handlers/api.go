package handlers

import (
	"github.com/go-chi/chi"
	"github.com/diliviotilaar/bookrecommendation/backend/internal/middleware"
)

func Handler(r *chi.Mux) {
	// public auth endpoints
	r.Post("/register", RegisterHandler)
	r.Post("/login", LoginHandler)

	// protected group
	r.Route("/account", func(r chi.Router) {
		r.Use(middleware.JWTAuth) // now use JWT middleware
	})
}