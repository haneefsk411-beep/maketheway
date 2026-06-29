from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from backend.database.connection import get_db
from backend.models.base import Hotel, User
from backend.schemas.pydantic_models import HotelResponse
from backend.services.security import get_current_user

router = APIRouter(prefix="/hotels", tags=["Hotels"])

@router.get("", response_model=List[HotelResponse])
def get_hotels(
    destination_id: Optional[str] = None,
    min_budget: Optional[float] = None,
    max_budget: Optional[float] = None,
    is_luxury: Optional[bool] = None,
    min_rating: Optional[float] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Hotel)
    
    if destination_id:
        query = query.filter(Hotel.destination_id == destination_id)
    if min_budget is not None:
        query = query.filter(Hotel.price >= min_budget)
    if max_budget is not None:
        query = query.filter(Hotel.price <= max_budget)
    if is_luxury is not None:
        query = query.filter(Hotel.is_luxury == is_luxury)
    if min_rating is not None:
        query = query.filter(Hotel.rating >= min_rating)
        
    return query.all()


@router.get("/{hotel_id}", response_model=HotelResponse)
def get_hotel_details(hotel_id: str, db: Session = Depends(get_db)):
    hotel = db.query(Hotel).filter(Hotel.id == hotel_id).first()
    if not hotel:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Hotel profile not found."
        )
    return hotel
