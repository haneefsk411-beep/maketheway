from fastapi import APIRouter, Depends, HTTPException, status, Response, Request
from sqlalchemy.orm import Session
from datetime import timedelta
from backend.database.connection import get_db
from backend.models.base import User, Notification
from backend.schemas.pydantic_models import UserRegister, UserLogin, UserResponse, ForgotPassword, ResetPassword
from backend.services.security import get_password_hash, verify_password, create_access_token, get_current_user

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=UserResponse)
def register(user_data: UserRegister, db: Session = Depends(get_db)):
    # Check if user already exists
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An account with this email address already exists."
        )

    # Hash password and create user
    hashed_pwd = get_password_hash(user_data.password)
    new_user = User(
        email=user_data.email,
        hashed_password=hashed_pwd,
        full_name=user_data.full_name,
        phone=user_data.phone,
        country=user_data.country,
        role="user"
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Add welcome notification
    welcome_notif = Notification(
        user_id=new_user.id,
        title="Welcome to FindTheWay!",
        message=f"Hi {new_user.full_name}, thank you for registering! Explore our destinations to plan your trips."
    )
    db.add(welcome_notif)
    db.commit()

    return new_user


@router.post("/login")
def login(login_data: UserLogin, response: Response, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == login_data.email).first()
    if not user or not verify_password(login_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password combination."
        )

    # Issue JWT token
    access_token = create_access_token(data={"sub": str(user.id)})
    
    # Store token in HttpOnly cookie
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        max_age=86400, # 24 hours
        samesite="lax",
        secure=False # Set to True in production with HTTPS
    )

    # Return profile data along with token
    return {
        "message": "Successfully logged in!",
        "token": access_token,
        "user": {
            "id": user.id,
            "email": user.email,
            "full_name": user.full_name,
            "role": user.role,
            "avatar_url": user.avatar_url,
            "phone": user.phone,
            "country": user.country
        }
    }


@router.post("/logout")
def logout(response: Response):
    response.delete_cookie(key="access_token")
    return {"message": "Successfully logged out!"}


@router.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user


@router.post("/forgot-password")
def forgot_password(data: ForgotPassword, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user:
        # Avoid user enumeration attacks
        return {"message": "If this email is registered, a password reset link has been sent."}
    
    # Send mock email reset token
    return {
        "message": "Password reset token generated successfully.",
        "reset_token": "mock-reset-token-12345"
    }


@router.post("/reset-password")
def reset_password(data: ResetPassword, db: Session = Depends(get_db)):
    if data.token != "mock-reset-token-12345":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired reset token."
        )
        
    # We will reset password for the demo user
    user = db.query(User).filter(User.email == "haneef@example.com").first()
    if not user:
         raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User account not found."
         )
         
    user.hashed_password = get_password_hash(data.new_password)
    db.commit()
    return {"message": "Password has been reset successfully!"}
