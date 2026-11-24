from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models.user import User
from models.portfolio import (
    Portfolio, Education, Skill, Project, Experience,
    Certification, SocialLink, ContactMessage
)
from schemas.portfolio import (
    PortfolioResponse, PersonalInfoUpdate, TemplateUpdate, PublishToggle,
    EducationCreate, EducationResponse,
    SkillCreate, SkillResponse,
    ProjectCreate, ProjectResponse,
    ExperienceCreate, ExperienceResponse,
    CertificationCreate, CertificationResponse,
    SocialLinkCreate, SocialLinkResponse,
    ContactMessageResponse
)
from services.auth import get_current_user
from services.portfolio_service import calculate_completion

router = APIRouter(prefix="/api/portfolio", tags=["Portfolio"])

def get_or_create_portfolio(user_id: int, db: Session) -> Portfolio:
    portfolio = db.query(Portfolio).filter(Portfolio.user_id == user_id).first()
    if not portfolio:
        user = db.query(User).filter(User.id == user_id).first()
        portfolio = Portfolio(
            user_id=user_id,
            full_name=user.username if user else "",
            email=user.email if user else "",
            selected_template="minimal",
            is_published=False
        )
        db.add(portfolio)
        db.commit()
        db.refresh(portfolio)
    return portfolio

@router.get("", response_model=PortfolioResponse)
def get_user_portfolio(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    portfolio = get_or_create_portfolio(current_user.id, db)
    completion = calculate_completion(portfolio)
    
    # Construct response dictionary
    resp = PortfolioResponse.from_orm(portfolio)
    resp.username = current_user.username
    resp.completion_percentage = completion
    return resp

@router.put("/personal", response_model=PortfolioResponse)
def update_personal_info(
    info: PersonalInfoUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    portfolio = get_or_create_portfolio(current_user.id, db)
    update_data = info.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(portfolio, key, value)
    db.commit()
    db.refresh(portfolio)

    resp = PortfolioResponse.from_orm(portfolio)
    resp.username = current_user.username
    resp.completion_percentage = calculate_completion(portfolio)
    return resp

@router.put("/template")
def update_template(
    update: TemplateUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    valid_templates = ["minimal", "developer", "creative"]
    if update.selected_template not in valid_templates:
        raise HTTPException(status_code=400, detail="Invalid template selected")
    portfolio = get_or_create_portfolio(current_user.id, db)
    portfolio.selected_template = update.selected_template
    db.commit()
    return {"message": "Template updated successfully", "template": portfolio.selected_template}

@router.put("/publish")
def toggle_publish(
    toggle: PublishToggle,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    portfolio = get_or_create_portfolio(current_user.id, db)
    portfolio.is_published = toggle.is_published
    db.commit()
    return {
        "message": "Portfolio published" if portfolio.is_published else "Portfolio unpublished",
        "is_published": portfolio.is_published
    }

# --- Education CRUD ---
@router.post("/education", response_model=EducationResponse)
def add_education(edu: EducationCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    portfolio = get_or_create_portfolio(current_user.id, db)
    new_edu = Education(portfolio_id=portfolio.id, **edu.dict())
    db.add(new_edu)
    db.commit()
    db.refresh(new_edu)
    return new_edu

@router.put("/education/{edu_id}", response_model=EducationResponse)
def update_education(edu_id: int, edu: EducationCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    portfolio = get_or_create_portfolio(current_user.id, db)
    existing = db.query(Education).filter(Education.id == edu_id, Education.portfolio_id == portfolio.id).first()
    if not existing:
        raise HTTPException(status_code=404, detail="Education item not found")
    for key, value in edu.dict().items():
        setattr(existing, key, value)
    db.commit()
    db.refresh(existing)
    return existing

@router.delete("/education/{edu_id}")
def delete_education(edu_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    portfolio = get_or_create_portfolio(current_user.id, db)
    existing = db.query(Education).filter(Education.id == edu_id, Education.portfolio_id == portfolio.id).first()
    if not existing:
        raise HTTPException(status_code=404, detail="Education item not found")
    db.delete(existing)
    db.commit()
    return {"message": "Education entry deleted successfully"}

# --- Skills CRUD ---
@router.post("/skills", response_model=SkillResponse)
def add_skill(skill: SkillCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    portfolio = get_or_create_portfolio(current_user.id, db)
    new_skill = Skill(portfolio_id=portfolio.id, **skill.dict())
    db.add(new_skill)
    db.commit()
    db.refresh(new_skill)
    return new_skill

@router.delete("/skills/{skill_id}")
def delete_skill(skill_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    portfolio = get_or_create_portfolio(current_user.id, db)
    existing = db.query(Skill).filter(Skill.id == skill_id, Skill.portfolio_id == portfolio.id).first()
    if not existing:
        raise HTTPException(status_code=404, detail="Skill not found")
    db.delete(existing)
    db.commit()
    return {"message": "Skill deleted successfully"}

# --- Projects CRUD ---
@router.post("/projects", response_model=ProjectResponse)
def add_project(project: ProjectCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    portfolio = get_or_create_portfolio(current_user.id, db)
    new_project = Project(portfolio_id=portfolio.id, **project.dict())
    db.add(new_project)
    db.commit()
    db.refresh(new_project)
    return new_project

@router.put("/projects/{project_id}", response_model=ProjectResponse)
def update_project(project_id: int, project: ProjectCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    portfolio = get_or_create_portfolio(current_user.id, db)
    existing = db.query(Project).filter(Project.id == project_id, Project.portfolio_id == portfolio.id).first()
    if not existing:
        raise HTTPException(status_code=404, detail="Project not found")
    for key, value in project.dict().items():
        setattr(existing, key, value)
    db.commit()
    db.refresh(existing)
    return existing

@router.delete("/projects/{project_id}")
def delete_project(project_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    portfolio = get_or_create_portfolio(current_user.id, db)
    existing = db.query(Project).filter(Project.id == project_id, Project.portfolio_id == portfolio.id).first()
    if not existing:
        raise HTTPException(status_code=404, detail="Project not found")
    db.delete(existing)
    db.commit()
    return {"message": "Project deleted successfully"}

# --- Experience CRUD ---
@router.post("/experience", response_model=ExperienceResponse)
def add_experience(exp: ExperienceCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    portfolio = get_or_create_portfolio(current_user.id, db)
    new_exp = Experience(portfolio_id=portfolio.id, **exp.dict())
    db.add(new_exp)
    db.commit()
    db.refresh(new_exp)
    return new_exp

@router.put("/experience/{exp_id}", response_model=ExperienceResponse)
def update_experience(exp_id: int, exp: ExperienceCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    portfolio = get_or_create_portfolio(current_user.id, db)
    existing = db.query(Experience).filter(Experience.id == exp_id, Experience.portfolio_id == portfolio.id).first()
    if not existing:
        raise HTTPException(status_code=404, detail="Experience not found")
    for key, value in exp.dict().items():
        setattr(existing, key, value)
    db.commit()
    db.refresh(existing)
    return existing

@router.delete("/experience/{exp_id}")
def delete_experience(exp_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    portfolio = get_or_create_portfolio(current_user.id, db)
    existing = db.query(Experience).filter(Experience.id == exp_id, Experience.portfolio_id == portfolio.id).first()
    if not existing:
        raise HTTPException(status_code=404, detail="Experience not found")
    db.delete(existing)
    db.commit()
    return {"message": "Experience deleted successfully"}

# --- Certifications CRUD ---
@router.post("/certifications", response_model=CertificationResponse)
def add_certification(cert: CertificationCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    portfolio = get_or_create_portfolio(current_user.id, db)
    new_cert = Certification(portfolio_id=portfolio.id, **cert.dict())
    db.add(new_cert)
    db.commit()
    db.refresh(new_cert)
    return new_cert

@router.put("/certifications/{cert_id}", response_model=CertificationResponse)
def update_certification(cert_id: int, cert: CertificationCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    portfolio = get_or_create_portfolio(current_user.id, db)
    existing = db.query(Certification).filter(Certification.id == cert_id, Certification.portfolio_id == portfolio.id).first()
    if not existing:
        raise HTTPException(status_code=404, detail="Certification not found")
    for key, value in cert.dict().items():
        setattr(existing, key, value)
    db.commit()
    db.refresh(existing)
    return existing

@router.delete("/certifications/{cert_id}")
def delete_certification(cert_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    portfolio = get_or_create_portfolio(current_user.id, db)
    existing = db.query(Certification).filter(Certification.id == cert_id, Certification.portfolio_id == portfolio.id).first()
    if not existing:
        raise HTTPException(status_code=404, detail="Certification not found")
    db.delete(existing)
    db.commit()
    return {"message": "Certification deleted successfully"}

# --- Social Links CRUD ---
@router.post("/socials", response_model=SocialLinkResponse)
def add_social_link(social: SocialLinkCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    portfolio = get_or_create_portfolio(current_user.id, db)
    new_link = SocialLink(portfolio_id=portfolio.id, **social.dict())
    db.add(new_link)
    db.commit()
    db.refresh(new_link)
    return new_link

@router.delete("/socials/{social_id}")
def delete_social_link(social_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    portfolio = get_or_create_portfolio(current_user.id, db)
    existing = db.query(SocialLink).filter(SocialLink.id == social_id, SocialLink.portfolio_id == portfolio.id).first()
    if not existing:
        raise HTTPException(status_code=404, detail="Social link not found")
    db.delete(existing)
    db.commit()
    return {"message": "Social link deleted successfully"}

# --- Contact Inquiries List ---
@router.get("/messages", response_model=List[ContactMessageResponse])
def get_contact_messages(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    portfolio = get_or_create_portfolio(current_user.id, db)
    messages = db.query(ContactMessage).filter(ContactMessage.portfolio_id == portfolio.id).order_by(ContactMessage.created_at.desc()).all()
    return messages

@router.put("/messages/{msg_id}/read")
def mark_message_as_read(msg_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    portfolio = get_or_create_portfolio(current_user.id, db)
    msg = db.query(ContactMessage).filter(ContactMessage.id == msg_id, ContactMessage.portfolio_id == portfolio.id).first()
    if not msg:
        raise HTTPException(status_code=404, detail="Message not found")
    msg.is_read = True
    db.commit()
    return {"message": "Marked as read"}

@router.delete("/messages/{msg_id}")
def delete_message(msg_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    portfolio = get_or_create_portfolio(current_user.id, db)
    msg = db.query(ContactMessage).filter(ContactMessage.id == msg_id, ContactMessage.portfolio_id == portfolio.id).first()
    if not msg:
        raise HTTPException(status_code=404, detail="Message not found")
    db.delete(msg)
    db.commit()
    return {"message": "Message deleted"}
