package handlers

import (
	"github.com/go-chi/chi"
	chimiddle "github.com/go-chi/chi/middleware"
	"github.com/diliviotilaar/bookrecommendation/backend/internal/middleware"
)

func Handler(r *chi.Mux) {
	// Global Middleware
	r.Use(chimiddle.StripSlashes)
	
	r.Route("/account", func(r chi.Router)) {
		router.Use(middleware.Authorization)

		router.Get("/coins", GetCoinBalance)
	}
}