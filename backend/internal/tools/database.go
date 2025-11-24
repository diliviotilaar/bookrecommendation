package tools

import (
	"context"
	"log"

	"github.com/jackc/pgx/v5/pgxpool"
)

var DB *pgxpool.Pool

// ConnectPostgres initializes the global database pool
func ConnectPostgres(url string) {
	var err error

	DB, err = pgxpool.New(context.Background(), url)
	if err != nil {
		log.Fatalf("❌ Failed to connect to PostgreSQL: %v", err)
	}

	log.Println("✅ PostgreSQL connection established")
}