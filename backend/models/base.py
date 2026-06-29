import datetime
from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from backend.database.connection import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    country = Column(String, nullable=True)
    role = Column(String, default="user") # user, admin
    avatar_url = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    trips = relationship("Trip", back_populates="user", cascade="all, delete-orphan")
    wishlists = relationship("Wishlist", back_populates="user", cascade="all, delete-orphan")
    saved_destinations = relationship("SavedDestination", back_populates="user", cascade="all, delete-orphan")
    reviews = relationship("Review", back_populates="user", cascade="all, delete-orphan")
    search_history = relationship("SearchHistory", back_populates="user", cascade="all, delete-orphan")
    notifications = relationship("Notification", back_populates="user", cascade="all, delete-orphan")


class Destination(Base):
    __tablename__ = "destinations"

    id = Column(String, primary_key=True, index=True) # e.g. "goa", "kashmir"
    name = Column(String, nullable=False)
    state = Column(String, nullable=False)
    description = Column(String, nullable=False)
    rating = Column(Float, default=4.5)
    review_count = Column(Integer, default=100)
    budget = Column(Float, nullable=False)
    coordinates = Column(JSON, nullable=False) # e.g. [15.2993, 74.1240]
    image = Column(String, nullable=False)

    # Relationships
    hotels = relationship("Hotel", back_populates="destination", cascade="all, delete-orphan")
    restaurants = relationship("Restaurant", back_populates="destination", cascade="all, delete-orphan")
    places = relationship("Place", back_populates="destination", cascade="all, delete-orphan")


class Hotel(Base):
    __tablename__ = "hotels"

    id = Column(String, primary_key=True, index=True) # e.g. "goa-h1"
    destination_id = Column(String, ForeignKey("destinations.id"), nullable=False)
    name = Column(String, nullable=False)
    location = Column(String, nullable=False)
    rating = Column(Float, default=4.5)
    price = Column(Float, nullable=False)
    image = Column(String, nullable=False)
    is_luxury = Column(Boolean, default=False)
    coordinates = Column(JSON, nullable=False)

    destination = relationship("Destination", back_populates="hotels")


class Restaurant(Base):
    __tablename__ = "restaurants"

    id = Column(String, primary_key=True, index=True)
    destination_id = Column(String, ForeignKey("destinations.id"), nullable=False)
    name = Column(String, nullable=False)
    cuisine = Column(String, nullable=False)
    rating = Column(Float, default=4.5)
    price_range = Column(String, nullable=False) # e.g. "₹₹", "₹₹₹"
    estimated_cost = Column(Float, nullable=False)
    image = Column(String, nullable=False)
    coordinates = Column(JSON, nullable=False)

    destination = relationship("Destination", back_populates="restaurants")


class Place(Base):
    __tablename__ = "places"

    id = Column(String, primary_key=True, index=True)
    destination_id = Column(String, ForeignKey("destinations.id"), nullable=False)
    name = Column(String, nullable=False)
    description = Column(String, nullable=False)
    timings = Column(String, nullable=False)
    entry_fee = Column(Float, default=0.0)
    location = Column(String, nullable=False)
    image = Column(String, nullable=False)
    coordinates = Column(JSON, nullable=False)

    destination = relationship("Destination", back_populates="places")


class Trip(Base):
    __tablename__ = "trips"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    title = Column(String, nullable=False)
    destination_id = Column(String, nullable=False)
    start_date = Column(String, nullable=False)
    end_date = Column(String, nullable=False)
    budget = Column(Float, nullable=False)
    travel_type = Column(String, nullable=False)
    route_coordinates = Column(JSON, nullable=True)
    status = Column(String, default="upcoming") # upcoming, completed, active
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="trips")


class Wishlist(Base):
    __tablename__ = "wishlist"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    destination_id = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="wishlists")


class SavedDestination(Base):
    __tablename__ = "saved_destinations"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    destination_id = Column(String, nullable=False)
    title = Column(String, nullable=False)
    notes = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="saved_destinations")


class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    target_id = Column(String, nullable=False) # e.g. hotel/destination ID
    target_type = Column(String, nullable=False) # destination, hotel, restaurant
    rating = Column(Float, nullable=False)
    text = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="reviews")


class SearchHistory(Base):
    __tablename__ = "search_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    query = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="search_history")


class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    title = Column(String, nullable=False)
    message = Column(String, nullable=False)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="notifications")
