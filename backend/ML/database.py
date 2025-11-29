import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from dotenv import load_dotenv
from pathlib import Path

# load .env.local
env_path = Path(__file__).parent.parent / ".env.local"
load_dotenv(dotenv_path=env_path)
print("Loaded POSTGRES_URL:", os.getenv("POSTGRES_URL"))

class Base(DeclarativeBase):
	pass


def _get_database_url() -> str:
	url = os.getenv("POSTGRES_URL")
	if not url:
		raise RuntimeError("POSTGRES_URL environment variable is not set")
	return url


engine = create_engine(_get_database_url(), pool_pre_ping=True)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)


def get_db():
	"""Yield a SQLAlchemy session (FastAPI-style dependency helper)."""
	db = SessionLocal()
	try:
		yield db
	finally:
		db.close()