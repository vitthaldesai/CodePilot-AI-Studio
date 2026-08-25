
import os
from datetime import datetime, timedelta, timezone

from dotenv import load_dotenv
from passlib.context import CryptContext
from jose import jwt


# Load environment variables from backend/.env
load_dotenv()


pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


# ============================================================
# JWT CONFIGURATION
# ============================================================

SECRET_KEY = os.getenv("CODEPILOT_SECRET_KEY")

if not SECRET_KEY:
    raise RuntimeError(
        "CODEPILOT_SECRET_KEY is not set in the environment."
    )

ALGORITHM = "HS256"

TOKEN_EXPIRE_DAYS = 7


# ============================================================
# PASSWORD HASHING
# ============================================================

def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(
    password: str,
    hashed_password: str
) -> bool:

    return pwd_context.verify(
        password,
        hashed_password
    )


# ============================================================
# JWT TOKEN
# ============================================================

def create_token(data: dict) -> str:

    payload = data.copy()

    expire = datetime.now(timezone.utc) + timedelta(
        days=TOKEN_EXPIRE_DAYS
    )

    payload["exp"] = expire

    return jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM
    )
