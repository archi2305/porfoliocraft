from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, HttpUrl

# --- Education Schemas ---
class EducationBase(BaseModel):
    institution: str
    degree: str
    specialization: Optional[str] = ""
    start_year: Optional[str] = ""
    end_year: Optional[str] = ""
    grade: Optional[str] = ""

class EducationCreate(EducationBase):
    pass

class EducationResponse(EducationBase):
    id: int
    portfolio_id: int

    class Config:
        from_attributes = True

# --- Skill Schemas ---
class SkillBase(BaseModel):
    name: str
    category: Optional[str] = "technical"  # technical, language, tool, soft

class SkillCreate(SkillBase):
    pass

class SkillResponse(SkillBase):
    id: int
    portfolio_id: int

    class Config:
        from_attributes = True

# --- Project Schemas ---
class ProjectBase(BaseModel):
    title: str
    description: str
    tech_stack: Optional[str] = ""
    github_url: Optional[str] = ""
    live_url: Optional[str] = ""

class ProjectCreate(ProjectBase):
    pass

class ProjectResponse(ProjectBase):
    id: int
    portfolio_id: int

    class Config:
        from_attributes = True

# --- Experience Schemas ---
class ExperienceBase(BaseModel):
    company: str
    role: str
    start_date: Optional[str] = ""
    end_date: Optional[str] = ""
    is_current: Optional[bool] = False
    description: Optional[str] = ""

class ExperienceCreate(ExperienceBase):
    pass

class ExperienceResponse(ExperienceBase):
    id: int
    portfolio_id: int

    class Config:
        from_attributes = True

# --- Certification Schemas ---
class CertificationBase(BaseModel):
    name: str
    issuer: str
    issue_date: Optional[str] = ""
    credential_url: Optional[str] = ""

class CertificationCreate(CertificationBase):
    pass

class CertificationResponse(CertificationBase):
    id: int
    portfolio_id: int

    class Config:
        from_attributes = True

# --- Social Link Schemas ---
class SocialLinkBase(BaseModel):
    platform: str
    url: str

class SocialLinkCreate(SocialLinkBase):
    pass

class SocialLinkResponse(SocialLinkBase):
    id: int
    portfolio_id: int

    class Config:
        from_attributes = True

# --- Contact Message Schemas ---
class ContactMessageCreate(BaseModel):
    sender_name: str
    sender_email: str
    subject: Optional[str] = "Portfolio Contact"
    message: str

class ContactMessageResponse(BaseModel):
    id: int
    portfolio_id: int
    sender_name: str
    sender_email: str
    subject: Optional[str]
    message: str
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True

# --- Portfolio Personal Info & Updates ---
class PersonalInfoUpdate(BaseModel):
    full_name: Optional[str] = ""
    title: Optional[str] = ""
    bio: Optional[str] = ""
    location: Optional[str] = ""
    phone: Optional[str] = ""
    email: Optional[str] = ""
    avatar_url: Optional[str] = ""
    resume_url: Optional[str] = ""
    resume_filename: Optional[str] = ""

class TemplateUpdate(BaseModel):
    selected_template: str

class PublishToggle(BaseModel):
    is_published: bool

# --- Full Portfolio Responses ---
class PortfolioResponse(BaseModel):
    id: int
    user_id: int
    username: Optional[str] = ""
    full_name: str
    title: str
    bio: str
    location: str
    phone: str
    email: str
    avatar_url: str
    resume_url: str
    resume_filename: str
    selected_template: str
    is_published: bool
    completion_percentage: int = 0
    created_at: datetime
    updated_at: datetime
    
    education: List[EducationResponse] = []
    skills: List[SkillResponse] = []
    projects: List[ProjectResponse] = []
    experience: List[ExperienceResponse] = []
    certifications: List[CertificationResponse] = []
    social_links: List[SocialLinkResponse] = []

    class Config:
        from_attributes = True

class PublicPortfolioResponse(BaseModel):
    username: Optional[str] = ""
    full_name: str
    title: str
    bio: str
    location: str
    phone: str
    email: str
    avatar_url: str
    resume_url: str
    resume_filename: str
    selected_template: str
    education: List[EducationResponse] = []
    skills: List[SkillResponse] = []
    projects: List[ProjectResponse] = []
    experience: List[ExperienceResponse] = []
    certifications: List[CertificationResponse] = []
    social_links: List[SocialLinkResponse] = []

    class Config:
        from_attributes = True
