import os
import uuid
import shutil
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, status
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from database import get_db
from models.user import User
from models.portfolio import Portfolio
from services.auth import get_current_user

router = APIRouter(prefix="/api", tags=["Uploads"])

UPLOAD_BASE = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "uploads")
AVATARS_DIR = os.path.join(UPLOAD_BASE, "avatars")
RESUMES_DIR = os.path.join(UPLOAD_BASE, "resumes")

os.makedirs(AVATARS_DIR, exist_ok=True)
os.makedirs(RESUMES_DIR, exist_ok=True)

ALLOWED_IMAGE_EXTS = {".png", ".jpg", ".jpeg", ".webp", ".gif"}

@router.post("/upload/avatar")
async def upload_avatar(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in ALLOWED_IMAGE_EXTS:
        raise HTTPException(status_code=400, detail="Invalid image format. Allowed: PNG, JPG, JPEG, WEBP, GIF")

    unique_filename = f"{current_user.id}_{uuid.uuid4().hex[:8]}{ext}"
    dest_path = os.path.join(AVATARS_DIR, unique_filename)

    with open(dest_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    portfolio = db.query(Portfolio).filter(Portfolio.user_id == current_user.id).first()
    if portfolio:
        # If old avatar was local, remove it
        if portfolio.avatar_url and "/api/uploads/avatars/" in portfolio.avatar_url:
            old_name = portfolio.avatar_url.split("/api/uploads/avatars/")[-1]
            old_file = os.path.join(AVATARS_DIR, old_name)
            if os.path.exists(old_file):
                try:
                    os.remove(old_file)
                except OSError:
                    pass
        portfolio.avatar_url = f"/api/uploads/avatars/{unique_filename}"
        db.commit()

    return {"avatar_url": f"/api/uploads/avatars/{unique_filename}", "message": "Avatar uploaded successfully"}

@router.post("/upload/resume")
async def upload_resume(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    ext = os.path.splitext(file.filename)[1].lower()
    if ext != ".pdf":
        raise HTTPException(status_code=400, detail="Only PDF resume files are accepted.")

    unique_filename = f"{current_user.id}_{uuid.uuid4().hex[:8]}_{file.filename}"
    dest_path = os.path.join(RESUMES_DIR, unique_filename)

    with open(dest_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    portfolio = db.query(Portfolio).filter(Portfolio.user_id == current_user.id).first()
    if portfolio:
        if portfolio.resume_url and "/api/uploads/resumes/" in portfolio.resume_url:
            old_name = portfolio.resume_url.split("/api/uploads/resumes/")[-1]
            old_file = os.path.join(RESUMES_DIR, old_name)
            if os.path.exists(old_file):
                try:
                    os.remove(old_file)
                except OSError:
                    pass
        portfolio.resume_url = f"/api/uploads/resumes/{unique_filename}"
        portfolio.resume_filename = file.filename
        db.commit()

    return {
        "resume_url": f"/api/uploads/resumes/{unique_filename}",
        "resume_filename": file.filename,
        "message": "Resume uploaded successfully"
    }

@router.delete("/upload/resume")
def remove_resume(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    portfolio = db.query(Portfolio).filter(Portfolio.user_id == current_user.id).first()
    if not portfolio or not portfolio.resume_url:
        return {"message": "No resume to remove"}

    if "/api/uploads/resumes/" in portfolio.resume_url:
        fname = portfolio.resume_url.split("/api/uploads/resumes/")[-1]
        fpath = os.path.join(RESUMES_DIR, fname)
        if os.path.exists(fpath):
            try:
                os.remove(fpath)
            except OSError:
                pass

    portfolio.resume_url = ""
    portfolio.resume_filename = ""
    db.commit()
    return {"message": "Resume removed successfully"}

@router.get("/uploads/avatars/{filename}")
def get_avatar(filename: str):
    file_path = os.path.join(AVATARS_DIR, filename)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Avatar not found")
    return FileResponse(file_path)

@router.get("/uploads/resumes/{filename}")
def get_resume(filename: str):
    file_path = os.path.join(RESUMES_DIR, filename)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Resume not found")
    return FileResponse(file_path, media_type="application/pdf", filename=filename)
