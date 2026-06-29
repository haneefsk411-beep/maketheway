from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session
from typing import List, Optional
from backend.database.connection import get_db
from backend.models.base import Destination, Hotel, Restaurant, Place, SearchHistory, User
from backend.schemas.pydantic_models import AutocompleteSuggestion, SearchHistoryResponse
from backend.services.security import get_current_user

router = APIRouter(prefix="/search", tags=["Smart Search"])

@router.get("/autocomplete", response_model=List[AutocompleteSuggestion])
def get_autocomplete(
    q: str = Query(..., min_length=1),
    db: Session = Depends(get_db)
):
    suggestions = []
    
    # 1. Search Destinations
    dests = db.query(Destination).filter(
        (Destination.name.ilike(f"%{q}%")) | (Destination.state.ilike(f"%{q}%"))
    ).limit(5).all()
    for d in dests:
        suggestions.append(AutocompleteSuggestion(
            id=d.id,
            name=d.name,
            type="destination",
            state=d.state
        ))
        
    # 2. Search Attractions
    places = db.query(Place).filter(Place.name.ilike(f"%{q}%")).limit(3).all()
    for p in places:
        suggestions.append(AutocompleteSuggestion(
            id=p.id,
            name=p.name,
            type="place",
            state=p.destination_id.capitalize()
        ))

    # 3. Search Hotels
    hotels = db.query(Hotel).filter(Hotel.name.ilike(f"%{q}%")).limit(3).all()
    for h in hotels:
        suggestions.append(AutocompleteSuggestion(
            id=h.id,
            name=h.name,
            type="hotel",
            state=h.location
        ))
        
    return suggestions


@router.post("/history")
def record_search(
    query: str = Query(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Save search query
    history = SearchHistory(user_id=current_user.id, query=query)
    db.add(history)
    db.commit()
    return {"message": "Query saved to search history!"}


@router.get("/recent", response_model=List[SearchHistoryResponse])
def get_recent_searches(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return db.query(SearchHistory).filter(
        SearchHistory.user_id == current_user.id
    ).order_by(SearchHistory.created_at.desc()).limit(5).all()


@router.get("/popular")
def get_popular_searches():
    # Return realistic top queries
    return [
        {"query": "Goa Beachfronts", "count": 1240},
        {"query": "Munnar Tea Gardens", "count": 980},
        {"query": "Kashmir Houseboats", "count": 870},
        {"query": "Jaipur Royal Forts", "count": 750}
    ]
