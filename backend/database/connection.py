import os
import logging
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("DatabaseConnection")

# Read from env; fallback to local SQLite for zero-setup execution
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./findtheway.db")

logger.info(f"Connecting database with URL schema: {DATABASE_URL.split('@')[-1]}")

connect_args = {}
if DATABASE_URL.startswith("sqlite"):
    connect_args = {"check_same_thread": False}

try:
    engine = create_engine(DATABASE_URL, connect_args=connect_args)
    # Test connection
    with engine.connect() as conn:
        logger.info("Database connection successfully established!")
except Exception as e:
    logger.error(f"Failed connecting to {DATABASE_URL} due to error: {e}")
    logger.info("Falling back to local SQLite database 'findtheway.db' for seamless development...")
    DATABASE_URL = "sqlite:///./findtheway.db"
    connect_args = {"check_same_thread": False}
    engine = create_engine(DATABASE_URL, connect_args=connect_args)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
