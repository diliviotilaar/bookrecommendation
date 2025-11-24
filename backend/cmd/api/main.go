package main

import (
	"fmt"
	"net/http"

	"github.com/go-chi/chi"
	"github.com/diliviotilaar/bookrecommendation/backend/internal/handlers"
	log "github.com/sirupsen/logrus"
)

func main() {

	log.ReportCaller(true)
	var r *chi.Mux = chi.NewRouter()

	handlers.Handler(r)

	fmt.Println("Starting GO API Service...")

	err := http.ListenAndServe("localhost:8000", r)

	if err != nil {
		log.Fatal("Error starting GO API Service: ", err)
	}
}