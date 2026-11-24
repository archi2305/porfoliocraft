from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models.user import User
from models.portfolio import Portfolio, ContactMessage
from schemas.portfolio import PublicPortfolioResponse, ContactMessageCreate

router = APIRouter(prefix="/api/public", tags=["Public Portfolio"])

@router.get("/{username}", response_model=PublicPortfolioResponse)
def get_public_portfolio(username: str, preview: bool = False, db: Session = Depends(get_db)):
    clean_username = username.strip().lower()
    user = db.query(User).filter(User.username == clean_username).first()
    if not user or not user.portfolio:
        raise HTTPException(status_code=404, detail="Portfolio not found for this username")

    portfolio = user.portfolio
    if not portfolio.is_published and not preview:
        raise HTTPException(
            status_code=403,
            detail="This portfolio is currently private / unpublished by the author."
        )

    resp = PublicPortfolioResponse.from_orm(portfolio)
    resp.username = user.username
    return resp

@router.post("/{username}/contact")
def submit_contact_message(
    username: str,
    message_data: ContactMessageCreate,
    db: Session = Depends(get_db)
):
    clean_username = username.strip().lower()
    user = db.query(User).filter(User.username == clean_username).first()
    if not user or not user.portfolio:
        raise HTTPException(status_code=404, detail="Recipient portfolio not found")

    if not user.portfolio.is_published:
        raise HTTPException(status_code=400, detail="Cannot send message to an unpublished portfolio")

    new_msg = ContactMessage(
        portfolio_id=user.portfolio.id,
        sender_name=message_data.sender_name.strip(),
        sender_email=message_data.sender_email.strip().lower(),
        subject=message_data.subject.strip() if message_data.subject else "Portfolio Contact",
        message=message_data.message.strip()
    )
    db.add(new_msg)
    db.commit()

    return {"message": "Thank you! Your message has been sent directly to the portfolio owner."}
