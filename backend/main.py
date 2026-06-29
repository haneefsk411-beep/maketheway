import logging
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from backend.database.connection import engine, SessionLocal, Base
from backend.database.mock_loader import seed_database
from backend.api import auth, users, trips, hotels, restaurants, places, search, profile

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("MainApplication")

# Initialize tables
Base.metadata.create_all(bind=engine)
# Seed initial mock records
db = SessionLocal()
try:
    seed_database(db)
finally:
    db.close()

# Rate limiting setup
limiter = Limiter(key_func=get_remote_address)
app = FastAPI(
    title="FindTheWay Travel Planner API",
    description="FastAPI Backend for FindTheWay Travel Website (Secure JWT Authentication & Autocomplete Searches)",
    version="1.0.0"
)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# CORS configurations
# Next.js frontend will run on port 3001
origins = [
    "http://localhost:3001",
    "http://127.0.0.1:3001",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True, # Allow passing JWT access_token secure cookie
    allow_methods=["*"],
    allow_headers=["*"],
)

# Route mounting
app.include_router(auth.router, prefix="/api")
app.include_router(users.router, prefix="/api")
app.include_router(trips.router, prefix="/api")
app.include_router(hotels.router, prefix="/api")
app.include_router(restaurants.router, prefix="/api")
app.include_router(places.router, prefix="/api")
app.include_router(search.router, prefix="/api")
app.include_router(profile.router, prefix="/api")

@app.get("/")
def read_root():
    return {
        "status": "online",
        "message": "Welcome to FindTheWay Travel Planner API. Navigate to /docs for interactive Swagger API schema details."
    }
