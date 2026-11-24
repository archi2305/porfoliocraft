from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Portfolio(Base):
    __tablename__ = "portfolios"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)
    
    # Personal Info
    full_name = Column(String, default="")
    title = Column(String, default="")
    bio = Column(Text, default="")
    location = Column(String, default="")
    phone = Column(String, default="")
    email = Column(String, default="")
    avatar_url = Column(String, default="")
    resume_url = Column(String, default="")
    resume_filename = Column(String, default="")
    
    # Configuration
    selected_template = Column(String, default="minimal")  # 'minimal', 'developer', 'creative'
    is_published = Column(Boolean, default=False)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="portfolio")
    education = relationship("Education", back_populates="portfolio", cascade="all, delete-orphan", lazy="joined")
    skills = relationship("Skill", back_populates="portfolio", cascade="all, delete-orphan", lazy="joined")
    projects = relationship("Project", back_populates="portfolio", cascade="all, delete-orphan", lazy="joined")
    experience = relationship("Experience", back_populates="portfolio", cascade="all, delete-orphan", lazy="joined")
    certifications = relationship("Certification", back_populates="portfolio", cascade="all, delete-orphan", lazy="joined")
    social_links = relationship("SocialLink", back_populates="portfolio", cascade="all, delete-orphan", lazy="joined")
    contact_messages = relationship("ContactMessage", back_populates="portfolio", cascade="all, delete-orphan", lazy="select", order_by="desc(ContactMessage.created_at)")

class Education(Base):
    __tablename__ = "education"

    id = Column(Integer, primary_key=True, index=True)
    portfolio_id = Column(Integer, ForeignKey("portfolios.id"), nullable=False)
    institution = Column(String, nullable=False)
    degree = Column(String, nullable=False)
    specialization = Column(String, default="")
    start_year = Column(String, default="")
    end_year = Column(String, default="")
    grade = Column(String, default="")

    portfolio = relationship("Portfolio", back_populates="education")

class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True)
    portfolio_id = Column(Integer, ForeignKey("portfolios.id"), nullable=False)
    name = Column(String, nullable=False)
    category = Column(String, default="technical")  # 'technical', 'language', 'tool', 'soft'

    portfolio = relationship("Portfolio", back_populates="skills")

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    portfolio_id = Column(Integer, ForeignKey("portfolios.id"), nullable=False)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    tech_stack = Column(String, default="")
    github_url = Column(String, default="")
    live_url = Column(String, default="")

    portfolio = relationship("Portfolio", back_populates="projects")

class Experience(Base):
    __tablename__ = "experience"

    id = Column(Integer, primary_key=True, index=True)
    portfolio_id = Column(Integer, ForeignKey("portfolios.id"), nullable=False)
    company = Column(String, nullable=False)
    role = Column(String, nullable=False)
    start_date = Column(String, default="")
    end_date = Column(String, default="")
    is_current = Column(Boolean, default=False)
    description = Column(Text, default="")

    portfolio = relationship("Portfolio", back_populates="experience")

class Certification(Base):
    __tablename__ = "certifications"

    id = Column(Integer, primary_key=True, index=True)
    portfolio_id = Column(Integer, ForeignKey("portfolios.id"), nullable=False)
    name = Column(String, nullable=False)
    issuer = Column(String, nullable=False)
    issue_date = Column(String, default="")
    credential_url = Column(String, default="")

    portfolio = relationship("Portfolio", back_populates="certifications")

class SocialLink(Base):
    __tablename__ = "social_links"

    id = Column(Integer, primary_key=True, index=True)
    portfolio_id = Column(Integer, ForeignKey("portfolios.id"), nullable=False)
    platform = Column(String, nullable=False)  # github, linkedin, twitter, website, etc.
    url = Column(String, nullable=False)

    portfolio = relationship("Portfolio", back_populates="social_links")

class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True, index=True)
    portfolio_id = Column(Integer, ForeignKey("portfolios.id"), nullable=False)
    sender_name = Column(String, nullable=False)
    sender_email = Column(String, nullable=False)
    subject = Column(String, default="")
    message = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    portfolio = relationship("Portfolio", back_populates="contact_messages")
