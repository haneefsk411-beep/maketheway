from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from backend.database.connection import get_db
from backend.models.base import Trip, User, Notification
from backend.schemas.pydantic_models import TripCreate, TripResponse
from backend.services.security import get_current_user

router = APIRouter(prefix="/trips", tags=["Trips"])

@router.post("", response_model=TripResponse)
def create_trip(
    trip_data: TripCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    new_trip = Trip(
        user_id=current_user.id,
        title=trip_data.title,
        destination_id=trip_data.destination_id,
        start_date=trip_data.start_date,
        end_date=trip_data.end_date,
        budget=trip_data.budget,
        travel_type=trip_data.travel_type,
        route_coordinates=trip_data.route_coordinates,
        status="upcoming"
    )
    db.add(new_trip)
    db.commit()
    db.refresh(new_trip)

    # Issue a notification
    notif = Notification(
        user_id=current_user.id,
        title="Trip Saved Successfully",
        message=f"Your upcoming trip '{new_trip.title}' to {new_trip.destination_id.capitalize()} has been added to your dashboard."
    )
    db.add(notif)
    db.commit()

    return new_trip


@router.get("", response_model=List[TripResponse])
def get_my_trips(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return db.query(Trip).filter(Trip.user_id == current_user.id).order_by(Trip.created_at.desc()).all()


@router.delete("/{trip_id}")
def delete_trip(
    trip_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    trip = db.query(Trip).filter(Trip.id == trip_id, Trip.user_id == current_user.id).first()
    if not trip:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Trip not found or access is denied."
        )

    db.delete(trip)
    db.commit()
    return {"message": "Trip itinerary cancelled and deleted successfully!"}
