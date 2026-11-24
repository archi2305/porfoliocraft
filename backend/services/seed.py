from sqlalchemy.orm import Session
from models.user import User
from models.portfolio import (
    Portfolio, Education, Skill, Project, Experience,
    Certification, SocialLink, ContactMessage
)
from services.auth import hash_password

def seed_demo_data(db: Session):
    existing_demo = db.query(User).filter(
        (User.email == "demo@portfoliocraft.com") | (User.username == "alexmorgan")
    ).first()
    
    if existing_demo:
        return existing_demo

    # Create demo user
    demo_user = User(
        email="demo@portfoliocraft.com",
        username="alexmorgan",
        hashed_password=hash_password("password123")
    )
    db.add(demo_user)
    db.commit()
    db.refresh(demo_user)

    # Create rich portfolio
    portfolio = Portfolio(
        user_id=demo_user.id,
        full_name="Alex Morgan",
        title="Full Stack Software Engineer & Cloud Enthusiast",
        bio="Passionate computer science graduate with deep experience in building modern web applications, scalable backend microservices, and interactive UI systems. Eager to solve real-world problems with elegant code and user-centered design.",
        location="San Francisco, CA",
        phone="+1 (555) 234-5678",
        email="alex.morgan@example.com",
        avatar_url="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
        selected_template="minimal",
        is_published=True
    )
    db.add(portfolio)
    db.commit()
    db.refresh(portfolio)

    # Education entries
    edu1 = Education(
        portfolio_id=portfolio.id,
        institution="Stanford University",
        degree="B.S. in Computer Science",
        specialization="Software Systems & Artificial Intelligence",
        start_year="2020",
        end_year="2024",
        grade="3.88 / 4.0 GPA"
    )
    edu2 = Education(
        portfolio_id=portfolio.id,
        institution="Westlake STEM Academy",
        degree="High School Diploma",
        specialization="Computer Science & Mathematics Honors",
        start_year="2016",
        end_year="2020",
        grade="Valedictorian (3.96 GPA)"
    )
    db.add_all([edu1, edu2])

    # Skills
    skills_data = [
        # Technical
        ("React.js", "technical"),
        ("FastAPI", "technical"),
        ("Python", "technical"),
        ("Node.js", "technical"),
        ("REST APIs", "technical"),
        ("PostgreSQL & SQLite", "technical"),
        # Languages
        ("JavaScript (ES6+)", "language"),
        ("TypeScript", "language"),
        ("Python 3", "language"),
        ("SQL", "language"),
        ("HTML5 & CSS3", "language"),
        # Tools
        ("Git & GitHub", "tool"),
        ("Docker", "tool"),
        ("Tailwind CSS", "tool"),
        ("Linux / Bash", "tool"),
        ("Postman", "tool"),
        ("Vite", "tool"),
        # Soft skills
        ("Agile & Scrum", "soft"),
        ("Team Collaboration", "soft"),
        ("Problem Solving", "soft"),
        ("Technical Writing", "soft"),
    ]
    for name, cat in skills_data:
        db.add(Skill(portfolio_id=portfolio.id, name=name, category=cat))

    # Projects
    p1 = Project(
        portfolio_id=portfolio.id,
        title="DevPulse - Real-Time Developer Workspace",
        description="A full-stack collaborative developer workspace featuring live code editing, instant markdown previews, team chat, and Kanban board management.",
        tech_stack="React, Tailwind CSS, FastAPI, WebSockets, SQLite",
        github_url="https://github.com/alexmorgan/devpulse",
        live_url="https://devpulse-demo.example.com"
    )
    p2 = Project(
        portfolio_id=portfolio.id,
        title="AI Semantic Search Engine",
        description="Intelligent search and knowledge base engine using embedding models, vector search, and automated document summarization.",
        tech_stack="Python, FastAPI, SentenceTransformers, ChromaDB, Docker",
        github_url="https://github.com/alexmorgan/ai-smartsearch",
        live_url="https://smartsearch-demo.example.com"
    )
    p3 = Project(
        portfolio_id=portfolio.id,
        title="EcoTrack - Carbon Footprint Analytics",
        description="Interactive analytics dashboard empowering households and small businesses to calculate, track, and benchmark their monthly carbon emissions.",
        tech_stack="React.js, Chart.js, Tailwind CSS, REST APIs",
        github_url="https://github.com/alexmorgan/ecotrack",
        live_url="https://ecotrack-demo.example.com"
    )
    db.add_all([p1, p2, p3])

    # Work Experience
    exp1 = Experience(
        portfolio_id=portfolio.id,
        company="Apex Cloud Labs",
        role="Software Engineer Intern",
        start_date="Jun 2023",
        end_date="Sep 2023",
        is_current=False,
        description="Developed and maintained backend API services handling over 100k daily requests. Optimized database queries reducing p95 latency by 32%. Authored integration test suites with 90%+ branch coverage."
    )
    exp2 = Experience(
        portfolio_id=portfolio.id,
        company="Campus Tech Solutions",
        role="Full Stack Developer Lead",
        start_date="Oct 2022",
        end_date="May 2023",
        is_current=False,
        description="Led a team of 4 student engineers building an internal event discovery platform serving 6,000+ university students. Architected responsive frontend with React and integrated authentication workflows."
    )
    db.add_all([exp1, exp2])

    # Certifications
    cert1 = Certification(
        portfolio_id=portfolio.id,
        name="AWS Certified Solutions Architect – Associate",
        issuer="Amazon Web Services (AWS)",
        issue_date="March 2024",
        credential_url="https://aws.amazon.com/verification"
    )
    cert2 = Certification(
        portfolio_id=portfolio.id,
        name="Meta Front-End Developer Professional Certificate",
        issuer="Meta / Coursera",
        issue_date="November 2023",
        credential_url="https://coursera.org/verify/meta-frontend"
    )
    db.add_all([cert1, cert2])

    # Social links
    s1 = SocialLink(portfolio_id=portfolio.id, platform="github", url="https://github.com/alexmorgan")
    s2 = SocialLink(portfolio_id=portfolio.id, platform="linkedin", url="https://linkedin.com/in/alexmorgan-dev")
    s3 = SocialLink(portfolio_id=portfolio.id, platform="website", url="https://alexmorgan.dev")
    s4 = SocialLink(portfolio_id=portfolio.id, platform="twitter", url="https://twitter.com/alexmorgan_dev")
    db.add_all([s1, s2, s3, s4])

    # Sample Contact Message
    msg1 = ContactMessage(
        portfolio_id=portfolio.id,
        sender_name="Sarah Jenkins",
        sender_email="sarah.jenkins@techrecruiting.io",
        subject="Exciting Frontend/Full-Stack Opportunity at TechVentures",
        message="Hi Alex, I came across your portfolio and was really impressed with your DevPulse project! We have an open Junior Software Engineer position on our core team that aligns closely with your skills. Would love to connect for a quick 15-minute chat this week.",
        is_read=False
    )
    db.add(msg1)

    db.commit()
    return demo_user
