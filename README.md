# PortfolioCraft - Personal Portfolio Builder Website

> A complete, responsive, full-stack personal portfolio builder built with **React.js**, **Tailwind CSS**, **Lucide Icons**, **Python FastAPI**, and **SQLite**.

---

## 🌟 Project Highlights

- **Zero-Code Portfolio Generation**: Users enter their personal information, education, skills, projects, work experience, achievements, social media links, and contact details — PortfolioCraft instantly generates a responsive, designer-grade portfolio website.
- **3 Distinct Portfolio Templates**:
  1. **Minimal Professional**: Editorial monochrome aesthetic, crisp serif/sans typography, high legibility.
  2. **Modern Developer**: Tech-focused dark mode, terminal header, code tags, repository links, interactive skill matrix.
  3. **Creative Personal**: Vibrant modern SaaS card aesthetic, soft purple/indigo gradient accents, floating avatar badges.
- **Unique Public URLs**: Each published user has their own shareable public URL at `/p/:username` (e.g. `/p/alexmorgan`).
- **Interactive Contact Inbox**: Visitors can send inquiries directly from the public portfolio contact form. Messages arrive in real-time in the user's dashboard inbox.
- **Resume PDF Management & Export**:
  - Upload existing PDF resumes for visitors to download.
  - Browser print / PDF export formatted for physical paper or digital saving.
- **Live Preview Modal**: Test and switch templates in real-time right inside the dashboard.
- **Profile Strength Meter**: Live calculation of completion score (0% to 100%) to encourage comprehensive portfolios.
- **Ready-to-Evaluate Demo Account**: Pre-seeded with rich real-world software engineering data for effortless college project evaluation.

---

## 🛠️ Technology Stack

| Layer | Technology | Description |
|---|---|---|
| **Frontend** | React 19 (Vite) | Fast component-based client application |
| **Styling** | Tailwind CSS v4 | Modern SaaS design with responsive utility classes |
| **Icons** | Lucide React + SVG | High-quality vector iconography |
| **Routing** | React Router v7 | Single Page Application client-side navigation |
| **HTTP Client** | Axios | REST API communication with JWT interceptors |
| **Backend** | Python FastAPI | Asynchronous, high-performance RESTful API |
| **Database** | SQLite + SQLAlchemy | Relational ORM data persistence |
| **Auth** | PyJWT & Bcrypt | Secure salted password hashing & Bearer token auth |
| **File Handling** | Python-multipart & Aiofiles | Avatar image and PDF resume upload storage |

---

## 📁 Project Structure

```text
portfolio website web tech/
├── backend/
│   ├── database.py              # SQLite engine, sessionmaker, and Base
│   ├── main.py                  # FastAPI app entry point & CORS configuration
│   ├── portfoliocraft.db        # SQLite database file
│   ├── requirements.txt         # Python dependencies
│   ├── test_backend.py          # Automated backend test suite
│   ├── models/                  # SQLAlchemy ORM models
│   │   ├── user.py              # User model
│   │   └── portfolio.py         # Portfolio, Education, Skills, Projects, etc.
│   ├── schemas/                 # Pydantic validation schemas
│   │   ├── auth.py              # Register, Login, Token schemas
│   │   └── portfolio.py         # Portfolio, Items, and Public response schemas
│   ├── routers/                 # FastAPI API route controllers
│   │   ├── auth.py              # Register, Login, Me endpoints
│   │   ├── portfolio.py         # Profile & multi-section CRUD endpoints
│   │   ├── upload.py            # Avatar & PDF resume upload/download
│   │   └── public.py            # Public view & visitor contact form submission
│   ├── services/                # Business logic & authentication
│   │   ├── auth.py              # Bcrypt hashing & JWT token encode/decode
│   │   ├── portfolio_service.py # Portfolio completion percentage calculator
│   │   └── seed.py              # Auto-seed script for demo account
│   └── uploads/                 # Local filesystem storage
│       ├── avatars/             # Uploaded user profile photos
│       └── resumes/             # Uploaded user PDF resumes
│
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js           # Vite config with Tailwind & /api proxy
│   └── src/
│       ├── App.jsx              # Application router
│       ├── index.css            # Tailwind CSS directives
│       ├── context/
│       │   └── AuthContext.jsx  # Authentication state & quick demo login
│       ├── services/
│       │   └── api.js           # Axios API service with auth interceptor
│       ├── components/
│       │   ├── common/          # Navbar, Footer, Toast, BrandIcons
│       │   ├── dashboard/       # 10 modular dashboard section editors
│       │   └── templates/       # 3 portfolio templates & ContactForm
│       └── pages/
│           ├── LandingPage.jsx  # Marketing homepage with live mockup preview
│           ├── LoginPage.jsx    # Login form with 1-click demo button
│           ├── RegisterPage.jsx # Registration with username validation
│           ├── DashboardPage.jsx# Complete user portfolio control center
│           ├── PublicPortfolioPage.jsx # Public view (/p/:username)
│           └── NotFoundPage.jsx # 404 page
│
├── start.sh                     # One-click startup script for both services
└── README.md                    # Project documentation
```

---

## ⚡ Quick Start Guide

### Prerequisites
- **Node.js** (v18+) and **npm**
- **Python** (v3.10+)

---

### Method 1: Using the All-in-One Startup Script

Run the automated startup script from the project root directory:

```bash
chmod +x start.sh
./start.sh
```

This will automatically:
1. Start the FastAPI backend on `http://127.0.0.1:8000`.
2. Start the React frontend on `http://localhost:5173`.

---

### Method 2: Running Backend and Frontend Manually

#### Step 1: Start the Backend (Terminal 1)

```bash
cd backend

# Create virtual environment if not present
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start FastAPI server
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

- API Base URL: `http://127.0.0.1:8000`
- Interactive Swagger API Docs: `http://127.0.0.1:8000/docs`

#### Step 2: Start the Frontend (Terminal 2)

```bash
cd frontend

# Install npm dependencies
npm install

# Start Vite dev server
npm run dev
```

- Web Application: `http://localhost:5173`

---

## 🔑 Pre-Configured Demo Account

For quick demonstration and college project viva evaluation, a rich demo profile is pre-seeded in the database:

| Credential | Value |
|---|---|
| **Email** | `demo@portfoliocraft.com` |
| **Username** | `alexmorgan` |
| **Password** | `password123` |
| **Public Portfolio URL** | `http://localhost:5173/p/alexmorgan` |

> 💡 **Tip:** On the Login page, you can simply click the **"One-Click Demo Login"** button to log straight in without typing!

---

## 🌐 Main Pages & Features

### 1. Landing Page (`/`)
- Modern SaaS hero section with clear headline: *"Build Your Professional Portfolio in Minutes"*.
- Interactive template switcher mockup showing Minimal, Developer, and Creative previews.
- Features grid highlighting 3 templates, resume management, public URL, contact inbox, and modular builder.
- 3-step walkthrough explaining how users create their portfolio.
- Sticky navigation and responsive mobile drawer.

### 2. Authentication (`/login` & `/register`)
- User registration with unique username validation (used for public URLs).
- Login supporting email or username + password.
- Secure salted bcrypt password hashing and JWT token authorization.
- Automatic session restoration from `localStorage`.

### 3. User Dashboard (`/dashboard`)
- Dynamic completion percentage meter (0% to 100%) tracking profile completeness.
- Action bar with:
  - **Publish / Unpublish toggle** (with celebratory confetti animation on publish).
  - **View Public Site** button.
  - **Copy Public URL** button with toast alert.
  - **Live Preview Modal** to preview any template inside the dashboard.
- 10 modular tabs:
  1. **Personal Information**: Full Name, Title, Bio, Location, Email, Phone, and Profile Photo upload.
  2. **Education**: Add, list, and delete degrees with institutions, years, and CGPA/grades.
  3. **Skills**: Categorized tags (Technical, Languages, Tools, Soft Skills) with quick-add chips.
  4. **Projects**: Title, description, tech stack, GitHub repo link, and live demo link.
  5. **Experience**: Roles, companies, date ranges, "Currently working" toggle, descriptions.
  6. **Certifications**: Credential name, issuer, issue date, and verification URLs.
  7. **Social Media**: Presets for GitHub, LinkedIn, Twitter/X, Website, etc.
  8. **Resume Upload**: Upload PDF files up to 10MB, display filename, download button, and print export.
  9. **Templates**: Visual template cards to switch active theme dynamically.
  10. **Messages Inbox**: View inquiries sent by visitors through the portfolio contact form.

### 4. Generated Public Portfolio (`/p/:username`)
- Renders chosen template (Minimal Professional, Modern Developer, or Creative Personal).
- Responsive sticky navbar with smooth scrolling to `#about`, `#skills`, `#projects`, `#experience`, `#education`, `#contact`.
- **Download Resume** button (downloads uploaded PDF resume or triggers print dialog).
- **Working Contact Form**: Visitors can send messages that are saved directly into the user's dashboard inbox.
- Respects publish status: Displays a polite "Draft mode" note if the portfolio is unpublished.

---

## 🧪 Automated Testing

To run the backend test suite verifying all endpoints, database queries, auth, portfolio generation, and contact messages:

```bash
cd backend
source venv/bin/activate
python test_backend.py
```

Output:
```text
1. Testing root endpoint...
 Root OK: PortfolioCraft API
2. Testing login with demo user...
 Login OK. Token received.
3. Testing get user portfolio...
 Portfolio OK. Completion: 100%
4. Testing public portfolio endpoint...
 Public portfolio OK.
5. Testing contact submission...
 Contact submission OK.
6. Testing get contact messages...
 Inquiries OK. Found 3 messages.
ALL BACKEND TESTS PASSED SUCCESSFULLY! 🎉
```

To run the frontend production build test:
```bash
cd frontend
npm run build
```

---

## 🎓 College Project Evaluation Guide

During your presentation or viva, you can demonstrate the following workflow:

1. **Homepage Walkthrough**: Show the landing page, explain the problem it solves (helping students create portfolios without coding), and show the interactive template preview mockup.
2. **One-Click Demo Login**: Click the demo button to show the rich profile of "Alex Morgan".
3. **Template Switching**: Go to the "Templates" tab in the dashboard, switch between **Minimal Professional**, **Modern Developer**, and **Creative Personal**, and open the **Live Preview Modal** to demonstrate real-time dynamic styling.
4. **Resume Upload & Download**: Show the Resume section, upload a PDF resume, and test the download button.
5. **Publish & Share**: Toggle the "Publish Portfolio" switch, show the confetti effect, copy the public URL, and open `/p/alexmorgan` in an incognito window.
6. **Live Contact Inquiry**: Fill out the contact form on the public portfolio as a "Recruiter", submit it, then switch back to the dashboard "Messages" tab to show the message received in real-time.

---

## 📄 License

This project was built for educational and portfolio demonstration purposes. Feel free to customize and expand it!
