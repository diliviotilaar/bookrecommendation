package models

type Books struct {
	ISBN           string `json:"isbn" db:"isbn"`
	BookTitle      string `json:"book_title" db:"book_title"`
	BookAuthor     string `json:"book_author" db:"book_author"`
	YearPublished  string `json:"year_published" db:"year_published"`
	Publisher      string `json:"publisher" db:"publisher"`
	ImageURLS      string `json:"image_url_s" db:"image_url_s"`
	ImageURLM      string `json:"image_url_m" db:"image_url_m"`
	ImageURLL      string `json:"image_url_l" db:"image_url_l"`
}