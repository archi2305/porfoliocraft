from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models.user import User
from models.portfolio import Portfolio
from schemas.auth import UserRegister, UserLogin, Token, UserResponse
from services.auth import (
    hash_password,
    verify_password,
    create_access_token,
    get_current_user
)

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

@router.post("/register", response_model=Token, status_code=status.HTTP_201_CREATED)
def register(user_data: UserRegister, db: Session = Depends(get_db)):
    # Check if email exists
    if db.query(User).filter(User.email == user_data.email.lower()).first():
        raise HTTPException(status_code=400, detail="Email is already registered")

    # Check if username exists
    username_clean = user_data.username.strip().lower()
    if db.query(User).filter(User.username == username_clean).first():
        raise HTTPException(status_code=400, detail="Username is already taken")

    # Create new user
    new_user = User(
        email=user_data.email.lower(),
        username=username_clean,
        hashed_password=hash_password(user_data.password)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Initialize empty portfolio for this user
    portfolio = Portfolio(
        user_id=new_user.id,
        full_name=user_data.username.capitalize(),
        email=user_data.email.lower(),
        selected_template="minimal",
        is_published=False
    )
    db.add(portfolio)
    db.commit()

    token = create_access_token({"user_id": new_user.id, "username": new_user.username})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": new_user
    }

@router.post("/login", response_model=Token)
def login(login_data: UserLogin, db: Session = Depends(get_db)):
    login_identifier = login_data.login.strip().lower()
    user = db.query(User).filter(
        (User.email == login_identifier) | (User.username == login_identifier)
    ).first()

    if not user or not verify_password(login_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email/username or password"
        )

    token = create_access_token({"user_id": user.id, "username": user.username})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": user
    }

@router.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user
