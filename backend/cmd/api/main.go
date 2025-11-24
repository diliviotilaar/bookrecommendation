package main

import (
	"log"
	"net/http"
	"os"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/joho/godotenv"

	"github.com/diliviotilaar/bookrecommendation/backend/internal/handlers"
	"github.com/diliviotilaar/bookrecommendation/backend/internal/tools"
)

func main() {
	// Load environment variables from .env
	if err := godotenv.Load(".env.local"); err != nil {
		log.Println("Warning: .env file not found. Continuing")
	}

	// Get POSTGRES_URL
	dbURL := os.Getenv("POSTGRES_URL")
	if dbURL == "" {
		log.Fatal("POSTGRES_URL is not set in environment variables")
	}

	// Connect to PostgreSQL
	tools.ConnectPostgres(dbURL)

	log.Println("Connected to PostgreSQL")

	// Create router
	r := chi.NewRouter()

	// Global middleware
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(middleware.StripSlashes)

	// Register routes
	handlers.Handler(r)

	log.Println("Starting GO API Service on http://localhost:8000")

	// Start server
	if err := http.ListenAndServe("localhost:8000", r); err != nil {
		log.Fatal("Error starting GO API Service:", err)
	}
}