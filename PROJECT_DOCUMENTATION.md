# PortfolioCraft - Comprehensive Technical Project Documentation

---

## 1. Project Title & Executive Summary

- **Project Title**: PortfolioCraft - Full-Stack Personal Portfolio Builder Website
- **Project Domain**: Web Technologies / SaaS Application / Full-Stack Development
- **Target Audience**: Students, Freshers, Job Seekers, Software Developers, and Working Professionals
- **Core Objective**: Provide an automated, zero-coding portfolio generation platform where users enter their professional details (education, skills, projects, experience, certifications, and resume) and receive an instantly deployed, responsive portfolio website rendered in 3 designer themes with a unique public URL.

---

## 2. System Architecture & High-Level Design

The project is architected as a decoupled, multi-tier Single Page Application (SPA) communicating with an asynchronous RESTful backend and persistent relational database:

```text
┌────────────────────────────────────────────────────────┐
│               Client Tier (React 19 + Vite)            │
│  - Landing Page with Live Interactive Template Mockup  │
│  - Authentication Pages (Login & Register + Demo Fast) │
│  - User Dashboard (10-Section Modular Portfolio Editor)│
│  - 3 Portfolio Templates (Minimal, Developer, Creative)│
│  - Public View (/p/:username) + Contact Inquiries Form │
└───────────────────────────┬────────────────────────────┘
                            │ Axios HTTP REST (Bearer JWT)
┌───────────────────────────▼────────────────────────────┐
│              Server Tier (Python FastAPI)              │
│  - Auth Router (/api/auth/register, /api/auth/login)   │
│  - Portfolio Router (/api/portfolio CRUD operations)   │
│  - File Upload Router (Avatars & PDF Resumes)          │
│  - Public Router (/api/public/:username, Contact Form) │
│  - Security: Salted Bcrypt Hashing & JWT Verification  │
│  - Auto-Seeding Service (Alex Morgan Demo Account)     │
└───────────────────────────┬────────────────────────────┘
                            │ SQLAlchemy ORM
┌───────────────────────────▼────────────────────────────┐
│            Data Tier (SQLite3 Database)                │
│  Tables: users, portfolios, education, skills,         │
│          projects, experience, certifications,         │
│          social_links, contact_messages                │
└────────────────────────────────────────────────────────┘
```

---

## 3. Technology Stack & Tools Used

### Frontend Architecture
- **Framework**: React 19 (React DOM)
- **Build Tool**: Vite 8.3 (High-speed module bundler, hot module replacement)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite` engine for zero-runtime styling)
- **Routing**: React Router v7 (`BrowserRouter`, `Routes`, `Route`, dynamic params `:username`)
- **Icons**: Lucide React + Custom Embedded SVG Brand Icons (GitHub, LinkedIn, Twitter/X)
- **HTTP Client**: Axios with request interceptors for Bearer JWT injection and 401 unauth handling
- **Animations & Effects**: Canvas Confetti (triggers on portfolio publishing)

### Backend Architecture
- **Framework**: Python FastAPI (High performance ASGI web framework)
- **Server**: Uvicorn (Lightning-fast ASGI server implementation)
- **ORM**: SQLAlchemy 2.0 (Declarative Base, relational mapping, cascades)
- **Database**: SQLite3 (Serverless, zero-configuration embedded relational database)
- **Password Hashing**: Bcrypt (Cryptographically secure salted password hashing)
- **Token Security**: PyJWT (HMAC-SHA256 JSON Web Tokens with 7-day expiration)
- **Data Validation**: Pydantic v2 (Strict schema validation and data sanitization)
- **File Management**: Python-Multipart and Aiofiles (Asynchronous filesystem streaming)

---

## 4. Database Schema Design (ER Specifications)

The database schema is organized into 9 relational tables:

### 1. `users`
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | Integer | Primary Key, Auto Increment | Unique user ID |
| `email` | String | Unique, Indexed, Not Null | Account email |
| `username` | String | Unique, Indexed, Not Null | Unique username for public URLs |
| `hashed_password` | String | Not Null | Salted bcrypt hash |
| `created_at` | DateTime | Default: UTC Now | Account timestamp |

### 2. `portfolios`
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | Integer | Primary Key, Auto Increment | Portfolio identifier |
| `user_id` | Integer | Foreign Key (`users.id`), Unique | 1-to-1 relationship with user |
| `full_name` | String | Default: "" | User's display name |
| `title` | String | Default: "" | Professional headline |
| `bio` | Text | Default: "" | Detailed summary / about me |
| `location` | String | Default: "" | City and state/country |
| `phone` | String | Default: "" | Contact phone number |
| `email` | String | Default: "" | Contact email address |
| `avatar_url` | String | Default: "" | Profile photo path or remote URL |
| `resume_url` | String | Default: "" | Path to uploaded resume PDF |
| `resume_filename`| String | Default: "" | Original filename of resume |
| `selected_template` | String | Default: "minimal" | Active template ('minimal', 'developer', 'creative') |
| `is_published` | Boolean | Default: False | Public visibility toggle |
| `created_at` | DateTime | Default: UTC Now | Created timestamp |
| `updated_at` | DateTime | Auto-update | Last updated timestamp |

### 3. `education`
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | Integer | Primary Key | Education entry ID |
| `portfolio_id` | Integer | Foreign Key (`portfolios.id`) | Cascading foreign key |
| `institution` | String | Not Null | University or school name |
| `degree` | String | Not Null | Degree (e.g. B.S. Computer Science) |
| `specialization`| String | Default: "" | Major/field of study |
| `start_year` | String | Default: "" | Starting year |
| `end_year` | String | Default: "" | Graduation year or "Present" |
| `grade` | String | Default: "" | GPA, percentage, or honors |

### 4. `skills`
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | Integer | Primary Key | Skill entry ID |
| `portfolio_id` | Integer | Foreign Key (`portfolios.id`) | Cascading foreign key |
| `name` | String | Not Null | Skill name (e.g. "React.js", "FastAPI") |
| `category` | String | Default: "technical" | 'technical', 'language', 'tool', 'soft' |

### 5. `projects`
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | Integer | Primary Key | Project ID |
| `portfolio_id` | Integer | Foreign Key (`portfolios.id`) | Cascading foreign key |
| `title` | String | Not Null | Project name |
| `description` | Text | Not Null | Detailed summary and features |
| `tech_stack` | String | Default: "" | Comma-separated tech list |
| `github_url` | String | Default: "" | Link to source repository |
| `live_url` | String | Default: "" | Link to deployment or demo |

### 6. `experience`
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | Integer | Primary Key | Experience ID |
| `portfolio_id` | Integer | Foreign Key (`portfolios.id`) | Cascading foreign key |
| `company` | String | Not Null | Organization name |
| `role` | String | Not Null | Job title / position |
| `start_date` | String | Default: "" | Start month and year |
| `end_date` | String | Default: "" | End month and year |
| `is_current` | Boolean | Default: False | True if currently working |
| `description` | Text | Default: "" | Key responsibilities & accomplishments |

### 7. `certifications`
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | Integer | Primary Key | Certification ID |
| `portfolio_id` | Integer | Foreign Key (`portfolios.id`) | Cascading foreign key |
| `name` | String | Not Null | Certificate / award name |
| `issuer` | String | Not Null | Issuing authority (e.g. AWS, Meta) |
| `issue_date` | String | Default: "" | Issue date |
| `credential_url`| String | Default: "" | Verification link |

### 8. `social_links`
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | Integer | Primary Key | Link ID |
| `portfolio_id` | Integer | Foreign Key (`portfolios.id`) | Cascading foreign key |
| `platform` | String | Not Null | github, linkedin, twitter, website, etc. |
| `url` | String | Not Null | Full profile URL |

### 9. `contact_messages`
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | Integer | Primary Key | Message ID |
| `portfolio_id` | Integer | Foreign Key (`portfolios.id`) | Recipient portfolio |
| `sender_name` | String | Not Null | Visitor's name |
| `sender_email` | String | Not Null | Visitor's email address |
| `subject` | String | Default: "Portfolio Contact" | Message subject |
| `message` | Text | Not Null | Content of the inquiry |
| `is_read` | Boolean | Default: False | Status flag |
| `created_at` | DateTime | Default: UTC Now | Time received |

---

## 5. REST API Specifications

### Authentication Routes (`/api/auth`)
- `POST /api/auth/register`: Accepts `{ email, username, password }`. Hashes password with bcrypt, creates `User` and initial `Portfolio`. Returns access token + user profile.
- `POST /api/auth/login`: Accepts `{ login, password }`. Validates credentials against hashed passwords. Returns JWT Bearer token + user profile.
- `GET /api/auth/me`: Requires Bearer JWT. Validates token payload and returns current authenticated user details.

### Portfolio Builder Routes (`/api/portfolio`)
- `GET /api/portfolio`: Requires Bearer JWT. Returns complete portfolio data with all relational lists and dynamically calculated completion percentage.
- `PUT /api/portfolio/personal`: Updates basic info (full_name, title, bio, location, phone, email, avatar).
- `PUT /api/portfolio/template`: Updates active template ('minimal', 'developer', or 'creative').
- `PUT /api/portfolio/publish`: Toggles public visibility status (`is_published: true/false`).
- `POST|PUT|DELETE /api/portfolio/education[/{id}]`: CRUD operations for education entries.
- `POST|DELETE /api/portfolio/skills[/{id}]`: Add and remove skills across categories.
- `POST|PUT|DELETE /api/portfolio/projects[/{id}]`: CRUD operations for project cards.
- `POST|PUT|DELETE /api/portfolio/experience[/{id}]`: CRUD operations for work history.
- `POST|PUT|DELETE /api/portfolio/certifications[/{id}]`: CRUD operations for credentials.
- `POST|DELETE /api/portfolio/socials[/{id}]`: Add and remove social profile links.
- `GET /api/portfolio/messages`: Lists inquiries submitted to this portfolio.
- `PUT /api/portfolio/messages/{id}/read`: Marks inquiry as read.
- `DELETE /api/portfolio/messages/{id}`: Deletes an inquiry.

### File Upload Routes (`/api`)
- `POST /api/upload/avatar`: Accepts image file (PNG, JPG, WEBP). Saves to disk with UUID and updates user avatar URL.
- `POST /api/upload/resume`: Accepts PDF file. Validates MIME type and `.pdf` extension. Saves to disk and links to portfolio.
- `DELETE /api/upload/resume`: Removes uploaded resume file from disk and clears portfolio reference.
- `GET /api/uploads/avatars/{filename}`: Serves profile photo.
- `GET /api/uploads/resumes/{filename}`: Serves PDF resume with content disposition.

### Public Routes (`/api/public`)
- `GET /api/public/{username}`: Retrieves public portfolio data for the given username. Checks whether portfolio is published (or preview mode).
- `POST /api/public/{username}/contact`: Accepts `{ sender_name, sender_email, subject, message }` from public visitors and saves it into the owner's message inbox.

---

## 6. Frontend Pages & Components

### 1. Landing Page (`src/pages/LandingPage.jsx`)
- Professional SaaS hero section with clear headline: *"Build Your Professional Portfolio in Minutes"*.
- **Interactive Template Switcher Mockup**: Users can preview how the same demo data looks in Minimal, Developer, and Creative modes without logging in.
- **Features Section**: 6-card grid highlighting responsive design, 3 templates, resume upload, public URLs, contact forms, and security.
- **3-Step Walkthrough**: Explaining the workflow (1. Enter Info -> 2. Select Template -> 3. Publish & Share).
- **Navigation & Footer**: Sticky navigation bar with mobile toggle menu and comprehensive footer.

### 2. Authentication Pages (`LoginPage.jsx` & `RegisterPage.jsx`)
- Clean centered card layout with smooth focus transitions.
- Registration with live lowercase/alphanumeric formatting for usernames.
- **One-Click Demo Login button**: Bypasses typing to immediately log in the pre-seeded account `alexmorgan`.

### 3. User Dashboard (`src/pages/DashboardPage.jsx`)
- **Completion Meter**: Live calculation displaying 0% to 100% profile strength.
- **Quick Action Bar**:
  - Publish / Unpublish toggle with **confetti burst animation** on publish.
  - "Copy Public Link" button with toast notification.
  - "View Public Site" direct link.
  - "Live Preview Modal" opening an instant modal preview of the portfolio.
- **10 Modular Editor Tabs**:
  1. `PersonalInfoSection`: Form fields + profile image uploader with preview.
  2. `EducationSection`: Modal/inline creator for degrees, universities, years, and GPAs.
  3. `SkillsSection`: Categorized chip tags (Technical, Languages, Tools, Soft Skills) with quick-add.
  4. `ProjectsSection`: Project cards with GitHub repo and live demo URL fields.
  5. `ExperienceSection`: Work milestones with "Currently working here" checkbox.
  6. `CertificationsSection`: Certification name, issuer, date, and external verification link.
  7. `SocialLinksSection`: Platform dropdown presets (GitHub, LinkedIn, Twitter, Website).
  8. `ResumeUploadSection`: PDF file uploader, file status badge, download button, and print export.
  9. `TemplatePickerSection`: Visual cards to switch between the 3 templates in 1 click.
  10. `MessagesInbox`: Real-time list of inquiries sent by recruiters through the public portfolio.

### 4. Three Distinct Portfolio Templates
1. **Minimal Professional (`MinimalProfessional.jsx`)**:
   - Clean, timeless, monochrome editorial layout.
   - Refined serif and sans-serif typography.
   - Structured dividers, project cards, and clean resume download action.
2. **Modern Developer (`ModernDeveloper.jsx`)**:
   - High-tech dark mode palette (`bg-slate-950`).
   - Terminal window header (`bash - 80x24`, `whoami`, `available for opportunities`).
   - Filterable skills matrix by category (Technical, Language, Tool, Soft).
   - Code tags (`<TechStack />`), repository and live demo buttons.
3. **Creative Personal (`CreativePersonal.jsx`)**:
   - Vibrant modern card aesthetic with soft purple, indigo, and violet gradient accents.
   - Floating avatar badge with "Available for Hire" indicator.
   - Colorful tag chips and card hover lift animations.

### 5. Public Portfolio Page (`src/pages/PublicPortfolioPage.jsx`)
- Rendered on `/p/:username` (e.g. `/p/alexmorgan`).
- Smooth scrolling navigation (`#about`, `#skills`, `#projects`, `#experience`, `#education`, `#contact`).
- Functional **Contact Form**: Directly dispatches messages to the user's dashboard.
- **Download Resume** button (downloads uploaded PDF or opens formatted print dialog).
- Floating "Made with PortfolioCraft" badge.

---

## 7. Security & Best Practices

1. **Password Protection**: Passwords are never stored in plaintext; hashed using `bcrypt.hashpw` with salt.
2. **Stateless Authentication**: Protected routes require valid JSON Web Tokens signed with HMAC-SHA256.
3. **MIME & Extension Validation**: Uploaded resumes must be valid PDF files; image avatars are restricted to PNG, JPG, JPEG, WEBP.
4. **CORS Hardening**: Strict CORS configuration whitelisting client ports (`localhost:5173`, `127.0.0.1:5173`) with allowed methods and headers.
5. **Cascading Relational Deletions**: Deleting a user or portfolio automatically cleans up all associated records (education, skills, projects, files) without orphaned records.

---

## 8. Verification & Test Execution Results

### Backend Automated Test Suite (`backend/test_backend.py`)
```bash
PYTHONPATH=backend backend/venv/bin/python backend/test_backend.py
```
- **Test 1**: Root endpoint status -> **PASSED** (PortfolioCraft API Online)
- **Test 2**: Login with demo user -> **PASSED** (JWT Token issued)
- **Test 3**: User portfolio retrieval -> **PASSED** (Profile score: 100%)
- **Test 4**: Public portfolio endpoint -> **PASSED** (Alex Morgan retrieved)
- **Test 5**: Contact message submission -> **PASSED** (Message stored in SQLite)
- **Test 6**: Contact message retrieval -> **PASSED** (Message visible in dashboard)
- **Overall Result**: **ALL 6 BACKEND TESTS PASSED SUCCESSFULLY!**

### Frontend Build Test (`npm run build`)
- Production bundling with Vite and `@tailwindcss/vite`: **PASSED in 227ms** with 0 errors.

---

## 9. Step-by-Step Local Execution Guide

### Option 1: Automated Script (Fastest)
```bash
./start.sh
```
Launches both FastAPI (`http://127.0.0.1:8000`) and Vite React (`http://localhost:5173`).

### Option 2: Running Separately
1. **Backend**:
   ```bash
   cd backend
   source venv/bin/activate
   uvicorn main:app --reload --host 127.0.0.1 --port 8000
   ```
2. **Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```

---

## 10. Demo Account for College Evaluation

| Credential | Value |
|---|---|
| **Email** | `demo@portfoliocraft.com` |
| **Username** | `alexmorgan` |
| **Password** | `password123` |
| **Public Portfolio** | `http://localhost:5173/p/alexmorgan` |
| **FastAPI Swagger Docs**| `http://127.0.0.1:8000/docs` |

