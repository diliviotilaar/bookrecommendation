package models

type User struct {
	UserID   int    `json:"user_id" db:"user_id"`
	Location string `json:"location" db:"location"`
	Age      int    `json:"age" db:"age"`
	Username string `json:"username" db:"username"`
	Password string `json:"password" db:"password"`
}