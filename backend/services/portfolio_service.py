from models.portfolio import Portfolio

def calculate_completion(portfolio: Portfolio) -> int:
    score = 0
    
    # 1. Basic Info (Name & Title) - 20%
    if portfolio.full_name and len(portfolio.full_name.strip()) > 0:
        score += 10
    if portfolio.title and len(portfolio.title.strip()) > 0:
        score += 10
        
    # 2. Bio & Location - 15%
    if portfolio.bio and len(portfolio.bio.strip()) > 10:
        score += 10
    if portfolio.location and len(portfolio.location.strip()) > 0:
        score += 5
        
    # 3. Avatar / Photo - 10%
    if portfolio.avatar_url and len(portfolio.avatar_url.strip()) > 0:
        score += 10
        
    # 4. Education - 15%
    if portfolio.education and len(portfolio.education) > 0:
        score += 15
        
    # 5. Skills - 15%
    if portfolio.skills and len(portfolio.skills) >= 3:
        score += 15
    elif portfolio.skills and len(portfolio.skills) > 0:
        score += 8
        
    # 6. Projects - 15%
    if portfolio.projects and len(portfolio.projects) >= 2:
        score += 15
    elif portfolio.projects and len(portfolio.projects) == 1:
        score += 10
        
    # 7. Experience / Certifications / Resume - 10%
    bonus = 0
    if portfolio.experience and len(portfolio.experience) > 0:
        bonus += 4
    if portfolio.certifications and len(portfolio.certifications) > 0:
        bonus += 3
    if portfolio.resume_url and len(portfolio.resume_url.strip()) > 0:
        bonus += 3
    score += min(bonus, 10)
    
    return min(score, 100)
