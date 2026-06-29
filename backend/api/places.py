from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from backend.database.connection import get_db
from backend.models.base import Place
from backend.schemas.pydantic_models import PlaceResponse

router = APIRouter(prefix="/places", tags=["Places"])

@router.get("", response_model=List[PlaceResponse])
def get_tourist_places(
    destination_id: Optional[str] = None,
    max_entry_fee: Optional[float] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Place)
    
    if destination_id:
        query = query.filter(Place.destination_id == destination_id)
    if max_entry_fee is not None:
        query = query.filter(Place.entry_fee <= max_entry_fee)
        
    return query.all()
