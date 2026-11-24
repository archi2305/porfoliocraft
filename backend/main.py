from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base, SessionLocal
from routers import auth, portfolio, upload, public
from services.seed import seed_demo_data

# Create database tables
Base.metadata.create_all(bind=engine)

# Auto seed demo user if not present
with SessionLocal() as db:
    try:
        seed_demo_data(db)
    except Exception as e:
        print(f"Seed note: {e}")

app = FastAPI(
    title="PortfolioCraft API",
    description="Backend API for PortfolioCraft - Full-Stack Personal Portfolio Builder Website",
    version="1.0.0"
)

# Configure CORS explicitly so browser requests from port 5173 succeed seamlessly
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(portfolio.router)
app.include_router(upload.router)
app.include_router(public.router)

@app.get("/")
def root():
    return {
        "app": "PortfolioCraft API",
        "status": "online",
        "docs": "/docs",
        "demo_user": "demo@portfoliocraft.com / password123 (username: alexmorgan)"
    }

@app.get("/health")
def health():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
