package models

type Ratings struct {
	UserID int    `json:"user_id" db:"user_id"`
	ISBN   string `json:"isbn" db:"isbn"`
	Ratings int    `json:"ratings" db:"ratings"`
}
