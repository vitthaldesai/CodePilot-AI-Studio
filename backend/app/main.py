import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.mongodb import get_database
from app.routes.auth import router as auth_router
from app.routes.review import router as review_router


# =====================================================
# LOAD ENVIRONMENT VARIABLES
# =====================================================

load_dotenv()


app = FastAPI(
    title="CodePilot-AI API",
    version="1.0.0"
)


# =====================================================
# CORS CONFIGURATION
# =====================================================

frontend_url = os.getenv(
    "FRONTEND_URL",
    "http://localhost:5173"
)

allowed_origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://codepilot-ai-nine.vercel.app",
]


# Add deployed frontend URL if provided
if frontend_url not in allowed_origins:
    allowed_origins.append(frontend_url)


app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =====================================================
# ROUTES
# =====================================================

app.include_router(auth_router)
app.include_router(review_router)


# =====================================================
# HOME
# =====================================================

@app.get("/")
def home():

    db = get_database()

    return {
        "message": "CodePilot-AI Backend Running",
        "database": db.name
    }