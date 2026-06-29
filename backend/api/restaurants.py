from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from backend.database.connection import get_db
from backend.models.base import Restaurant
from backend.schemas.pydantic_models import RestaurantResponse

router = APIRouter(prefix="/restaurants", tags=["Restaurants"])

@router.get("", response_model=List[RestaurantResponse])
def get_restaurants(
    destination_id: Optional[str] = None,
    cuisine: Optional[str] = None,
    max_cost: Optional[float] = None,
    min_rating: Optional[float] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Restaurant)
    
    if destination_id:
        query = query.filter(Restaurant.destination_id == destination_id)
    if cuisine:
        query = query.filter(Restaurant.cuisine.ilike(f"%{cuisine}%"))
    if max_cost is not None:
        query = query.filter(Restaurant.estimated_cost <= max_cost)
    if min_rating is not None:
        query = query.filter(Restaurant.rating >= min_rating)
        
    return query.all()
