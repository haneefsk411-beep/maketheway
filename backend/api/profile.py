from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from backend.database.connection import get_db
from backend.models.base import Destination, Wishlist, Notification, Trip, User, Review
from backend.schemas.pydantic_models import DestinationResponse, WishlistResponse, NotificationResponse, ReviewCreate, ReviewResponse
from backend.services.security import get_current_user

router = APIRouter(prefix="", tags=["User Dashboard & Destinations"])

@router.get("/destinations", response_model=List[DestinationResponse])
def get_destinations(db: Session = Depends(get_db)):
    return db.query(Destination).all()


@router.get("/destinations/{dest_id}", response_model=DestinationResponse)
def get_destination_details(dest_id: str, db: Session = Depends(get_db)):
    dest = db.query(Destination).filter(Destination.id == dest_id).first()
    if not dest:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Destination profile not found in our database."
        )
    return dest


@router.post("/destinations/{dest_id}/reviews", response_model=ReviewResponse)
def add_review(
    dest_id: str,
    review_data: ReviewCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    new_review = Review(
        user_id=current_user.id,
        target_id=dest_id,
        target_type=review_data.target_type,
        rating=review_data.rating,
        text=review_data.text
    )
    db.add(new_review)
    db.commit()
    db.refresh(new_review)

    # Return with username
    return ReviewResponse(
        id=new_review.id,
        user_id=new_review.user_id,
        user_name=current_user.full_name,
        target_id=new_review.target_id,
        target_type=new_review.target_type,
        rating=new_review.rating,
        text=new_review.text,
        created_at=new_review.created_at
    )


@router.get("/destinations/{dest_id}/reviews", response_model=List[ReviewResponse])
def get_reviews(dest_id: str, db: Session = Depends(get_db)):
    reviews = db.query(Review).filter(Review.target_id == dest_id).all()
    res = []
    for r in reviews:
        user = db.query(User).filter(User.id == r.user_id).first()
        res.append(ReviewResponse(
            id=r.id,
            user_id=r.user_id,
            user_name=user.full_name if user else "Anonymous",
            target_id=r.target_id,
            target_type=r.target_type,
            rating=r.rating,
            text=r.text,
            created_at=r.created_at
        ))
    return res


@router.post("/wishlist/{dest_id}")
def toggle_wishlist(
    dest_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Check if exists
    item = db.query(Wishlist).filter(
        Wishlist.user_id == current_user.id,
        Wishlist.destination_id == dest_id
    ).first()

    if item:
        db.delete(item)
        db.commit()
        return {"action": "removed", "message": "Destination removed from your wishlist."}
    else:
        new_item = Wishlist(user_id=current_user.id, destination_id=dest_id)
        db.add(new_item)
        db.commit()
        return {"action": "added", "message": "Destination saved to your wishlist!"}


@router.get("/wishlist", response_model=List[WishlistResponse])
def get_my_wishlist(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return db.query(Wishlist).filter(Wishlist.user_id == current_user.id).all()


@router.get("/notifications", response_model=List[NotificationResponse])
def get_notifications(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return db.query(Notification).filter(
        Notification.user_id == current_user.id
    ).order_by(Notification.created_at.desc()).all()


@router.put("/notifications/{notif_id}/read")
def mark_notification_read(
    notif_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    notif = db.query(Notification).filter(
        Notification.id == notif_id,
        Notification.user_id == current_user.id
    ).first()
    if not notif:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Notification not found."
        )
    notif.is_read = True
    db.commit()
    return {"message": "Notification marked as read."}


@router.get("/dashboard/summary")
def get_dashboard_summary(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    trips_count = db.query(Trip).filter(Trip.user_id == current_user.id).count()
    wishlist_count = db.query(Wishlist).filter(Wishlist.user_id == current_user.id).count()
    reviews_count = db.query(Review).filter(Review.user_id == current_user.id).count()
    
    return {
        "trips_count": trips_count,
        "wishlist_count": wishlist_count,
        "reviews_count": reviews_count,
        "membership_tier": "Gold Explorer" if trips_count >= 2 else "Silver Explorer",
        "recent_searches_count": 5
    }
