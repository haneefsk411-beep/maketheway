from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import datetime

# --- AUTH & USER SCHEMAS ---
class UserRegister(BaseModel):
    email: EmailStr
    password: str = Field(min_length=6, description="Password must be at least 6 characters")
    full_name: str
    phone: Optional[str] = None
    country: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class ForgotPassword(BaseModel):
    email: EmailStr

class ResetPassword(BaseModel):
    token: str
    new_password: str = Field(min_length=6)

class ChangePassword(BaseModel):
    current_password: str
    new_password: str = Field(min_length=6)

class UpdateProfile(BaseModel):
    full_name: Optional[str] = None
    phone: Optional[str] = None
    country: Optional[str] = None
    avatar_url: Optional[str] = None

class UserResponse(BaseModel):
    id: int
    email: EmailStr
    full_name: Optional[str]
    phone: Optional[str]
    country: Optional[str]
    role: str
    avatar_url: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True


# --- TRAVEL ITEMS SCHEMAS ---
class DestinationResponse(BaseModel):
    id: str
    name: str
    state: str
    description: str
    rating: float
    review_count: int
    budget: float
    coordinates: List[float]
    image: str

    class Config:
        from_attributes = True

class HotelResponse(BaseModel):
    id: str
    destination_id: str
    name: str
    location: str
    rating: float
    price: float
    image: str
    is_luxury: bool
    coordinates: List[float]

    class Config:
        from_attributes = True

class RestaurantResponse(BaseModel):
    id: str
    destination_id: str
    name: str
    cuisine: str
    rating: float
    price_range: str
    estimated_cost: float
    image: str
    coordinates: List[float]

    class Config:
        from_attributes = True

class PlaceResponse(BaseModel):
    id: str
    destination_id: str
    name: str
    description: str
    timings: str
    entry_fee: float
    location: str
    image: str
    coordinates: List[float]

    class Config:
        from_attributes = True


# --- TRIP & DASHBOARD SCHEMAS ---
class TripCreate(BaseModel):
    title: str
    destination_id: str
    start_date: str
    end_date: str
    budget: float
    travel_type: str
    route_coordinates: Optional[List[List[float]]] = None

class TripResponse(BaseModel):
    id: int
    user_id: int
    title: str
    destination_id: str
    start_date: str
    end_date: str
    budget: float
    travel_type: str
    route_coordinates: Optional[List[List[float]]] = None
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

class WishlistToggle(BaseModel):
    destination_id: str

class WishlistResponse(BaseModel):
    id: int
    user_id: int
    destination_id: str
    created_at: datetime

    class Config:
        from_attributes = True

class SavedDestinationCreate(BaseModel):
    destination_id: str
    title: str
    notes: Optional[str] = None

class SavedDestinationResponse(BaseModel):
    id: int
    user_id: int
    destination_id: str
    title: str
    notes: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True


# --- REVIEWS & SEARCH & NOTIFICATIONS ---
class ReviewCreate(BaseModel):
    target_id: str
    target_type: str # destination, hotel, restaurant
    rating: float = Field(ge=1.0, le=5.0)
    text: str

class ReviewResponse(BaseModel):
    id: int
    user_id: int
    user_name: Optional[str] = None
    target_id: str
    target_type: str
    rating: float
    text: str
    created_at: datetime

    class Config:
        from_attributes = True

class SearchHistoryResponse(BaseModel):
    id: int
    query: str
    created_at: datetime

    class Config:
        from_attributes = True

class AutocompleteSuggestion(BaseModel):
    id: str
    name: str
    type: str # destination, hotel, restaurant, place
    state: Optional[str] = None

class NotificationResponse(BaseModel):
    id: int
    title: str
    message: str
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True
