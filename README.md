# CodePilot AI

### AI-Powered Code Review & Security Analysis Platform

CodePilot AI is a full-stack web application that uses artificial intelligence to analyze source code and provide professional code reviews.

It helps developers identify potential bugs, security vulnerabilities, performance issues, code-quality problems, and improvement opportunities before committing or merging code into a project.

---
## Live Demo 

https://code-pilot-ai-studio-53rqt4zyn-desai3.vercel.app/

## Features

* User registration and login
* JWT-based authentication
* AI-powered code analysis
* Multi-language code review
* Bug and issue detection
* Security vulnerability analysis
* Performance recommendations
* Code quality and best-practice suggestions
* Detailed review results
* AI chat for discussing reviewed code
* Review history
* User profile
* Review report generation
* Responsive web interface

---

## Technology Stack

### Frontend

* React
* Vite
* Tailwind CSS
* React Router
* Lucide React

### Backend

* Python
* FastAPI
* Uvicorn
* Pydantic

### Database

* MongoDB Atlas
* PyMongo

### AI

* Groq API
* AI-powered code analysis

### Authentication

* JWT
* Passlib
* bcrypt

### Deployment

* Vercel — Frontend
* Render — Backend
* GitHub — Version Control

---

## System Architecture

```text
                    ┌──────────────────────────┐
                    │       CodePilot AI       │
                    │       Web Client         │
                    │     React + Vite         │
                    └────────────┬─────────────┘
                                 │
                                 │ HTTP / REST API
                                 ▼
                    ┌──────────────────────────┐
                    │       FastAPI API        │
                    │         Backend          │
                    └────────────┬─────────────┘
                                 │
              ┌──────────────────┼──────────────────┐
              │                  │                  │
              ▼                  ▼                  ▼
       ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
       │  MongoDB    │    │  Groq AI    │    │    JWT      │
       │    Atlas    │    │    Model     │    │    Auth     │
       └─────────────┘    └─────────────┘    └─────────────┘
```

---

## Application Workflow

```text
User
 │
 ▼
Register / Login
 │
 ▼
Dashboard
 │
 ▼
Code Review
 │
 ├── Select Programming Language
 │
 ├── Enter / Submit Source Code
 │
 ▼
AI Analysis
 │
 ├── Bugs
 ├── Security Issues
 ├── Performance
 ├── Code Quality
 └── Improvements
 │
 ▼
Review Results
 │
 ├── Detailed Analysis
 ├── AI Chat
 └── Report
 │
 ▼
Review History
```

---

## Project Structure

```text
CodePilot-AI/
│
├── backend/
│   ├── app/
│   │   ├── database/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── config.py
│   │   └── main.py
│   │
│   ├── .env.example
│   ├── requirements.txt
│   └── ...
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

## Main Modules

### 1. Authentication

Users can create an account and securely log in.

Authentication is handled using JWT tokens, while passwords are securely hashed before being stored.

### 2. Code Review

Users can submit source code and select the appropriate programming language.

The application sends the code to the AI analysis service and generates a structured review.

### 3. AI Analysis

The AI analyzes submitted code for:

* Bugs
* Security vulnerabilities
* Performance issues
* Code smells
* Quality problems
* Best-practice improvements

### 4. AI Chat

After receiving a review, users can interact with the AI to ask questions and better understand the analyzed code.

### 5. Review History

Previous code reviews are stored and can be accessed from the History page.

### 6. Dashboard

The dashboard provides an overview of the user's activity and recent reviews.

### 7. Profile

Users can access their account information from the Profile page.

---

## Environment Variables

Create a `.env` file inside the `backend` directory.

Example:

```env
MONGO_URL=your-mongodb-connection-string
DATABASE_NAME=your-database-name
GROQ_API_KEY=your-groq-api-key
CODEPILOT_SECRET_KEY=your-secret-key
FRONTEND_URL=http://localhost:5173
```

Never commit the actual `.env` file or API keys to GitHub.

---

## Running the Project Locally

### Backend

Open a terminal:

```bash
cd backend
```

Create and activate a virtual environment if required:

```bash
python -m venv venv
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the FastAPI server:

```bash
uvicorn app.main:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

### Frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## Deployment

The project is deployed using:

* **Frontend:** Vercel
* **Backend:** Render
* **Database:** MongoDB Atlas
* **Source Code:** GitHub

### Production URLs

**Frontend**

https://code-pilot-ai-studio-53rqt4zyn-desai3.vercel.app/

**Backend**

https://codepilot-ai-backend-sdyp.onrender.com/

**API Docs**
https://codepilot-ai-backend-sdyp.onrender.com/docs

---


---

## Security Considerations

The application follows several basic security practices:

* Password hashing using bcrypt
* JWT-based authentication
* Protected backend routes
* Environment variables for sensitive credentials
* CORS configuration
* API keys excluded from source control
* `.env` excluded through `.gitignore`

---

## Project Status

| Module           | Status    |
| ---------------- | --------- |
| Project Planning | Completed |
| Architecture     | Completed |
| Backend          | Completed |
| Database         | Completed |
| Authentication   | Completed |
| AI Integration   | Completed |
| Frontend         | Completed |
| Dashboard        | Completed |
| Code Review      | Completed |
| AI Chat          | Completed |
| Review History   | Completed |
| Profile          | Completed |
| Deployment       | Completed |

---

## Future Enhancements

Possible future improvements include:

* GitHub repository integration
* Pull request code reviews
* Additional programming languages
* Advanced static analysis
* Code quality scoring
* Team collaboration
* Email notifications
* Detailed analytics
* Custom project-level review rules

---

## Purpose

CodePilot AI was developed as an academic full-stack project to explore the integration of modern web development, REST APIs, authentication, databases, cloud deployment, and AI-powered software engineering tools.

---

## Author

**Vitthal Desai**

BCA — Bachelor of Computer Applications

---

## License

This project is developed for educational and academic purposes.

```
```
