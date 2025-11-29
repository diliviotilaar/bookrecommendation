from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import declarative_base
from database import Base

class Books(Base):
    __tablename__ = "books"
    isbn = Column("isbn", String, primary_key=True)
    book_title = Column("book_title", String)
    book_author = Column("book_author", String)
    year_published = Column("year_published", String)
    publisher = Column("publisher", String)
    image_url_s = Column("image_url_s", String)
    image_url_m = Column("image_url_m", String)
    image_url_l = Column("image_url_l", String)

class User(Base):
    __tablename__ = "user"
    user_id = Column(Integer, primary_key=True)
    location = Column("location", String)
    age = Column("age", Integer)
    username = Column("username", String)
    password = Column("password", String)

class Ratings(Base):
    __tablename__ = "ratings"
    user_id = Column("user_id", Integer, primary_key=True)
    isbn = Column("isbn", String, primary_key=True)
    ratings = Column("ratings", Integer)