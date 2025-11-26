package handlers

import (
	"github.com/go-chi/chi"
	"github.com/diliviotilaar/bookrecommendation/backend/internal/middleware"
	"github.com/diliviotilaar/bookrecommendation/backend/internal/routes"
)

func Handler(r *chi.Mux) {
	// public auth endpoints
	r.Post("/register", RegisterHandler)
	r.Post("/login", LoginHandler)

	// protected group
	r.Route("/account", func(r chi.Router) {
		r.Use(middleware.JWTAuth)
		
		r.Get("/books", routes.GetAllBooksRoute)
		r.Post("/ratings", routes.InsertRatingRoute)
		r.Post("/recommendations", routes.GetRecommendationsRoute)
	})
}