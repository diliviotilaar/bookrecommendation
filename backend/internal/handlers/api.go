package handlers

import (
	"github.com/go-chi/chi"
	"github.com/diliviotilaar/bookrecommendation/backend/internal/middleware"
	"github.com/diliviotilaar/bookrecommendation/backend/internal/routes"
	"github.com/go-chi/cors"
)

func Handler(r *chi.Mux) {
	// CORS
	r.Use(cors.Handler(cors.Options{
        AllowedOrigins:   []string{"http://localhost:5173", "http://localhost:3000"},
        AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
        AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type"},
        ExposedHeaders:   []string{"Link"},
        AllowCredentials: true,
        MaxAge:           300, // 5 minutes
    }))

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