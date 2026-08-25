from fastapi import APIRouter, HTTPException, Depends, status
from pymongo.errors import PyMongoError

from app.models.user import UserCreate, UserLogin
from app.database.mongodb import get_database
from app.utils.security import (
    hash_password,
    verify_password,
    create_token,
)
from app.utils.auth import get_current_user


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)

db = get_database()


# ============================================================
# REGISTER
# ============================================================

@router.post(
    "/register",
    status_code=status.HTTP_201_CREATED,
)
def register(user: UserCreate):

    # --------------------------------------------------------
    # NORMALIZE INPUT
    # --------------------------------------------------------

    name = user.name.strip()
    email = user.email.strip().lower()

    if not name:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Name cannot be empty",
        )

    if not email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email cannot be empty",
        )

    # --------------------------------------------------------
    # CHECK EXISTING USER
    # --------------------------------------------------------

    try:

        existing_user = db.users.find_one(
            {
                "email": email
            }
        )

    except PyMongoError:

        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database service is temporarily unavailable",
        )

    if existing_user:

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An account with this email already exists",
        )

    # --------------------------------------------------------
    # HASH PASSWORD
    # --------------------------------------------------------

    try:

        hashed_password = hash_password(
            user.password
        )

    except Exception:

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to process password",
        )

    # --------------------------------------------------------
    # CREATE USER
    # --------------------------------------------------------

    try:

        db.users.insert_one(
            {
                "name": name,
                "email": email,
                "password": hashed_password,
            }
        )

    except PyMongoError:

        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Unable to create account",
        )

    return {
        "status": "success",
        "message": "Account created successfully",
    }


# ============================================================
# LOGIN
# ============================================================

@router.post("/login")
def login(user: UserLogin):

    email = user.email.strip().lower()

    # --------------------------------------------------------
    # FIND USER
    # --------------------------------------------------------

    try:

        existing_user = db.users.find_one(
            {
                "email": email
            }
        )

    except PyMongoError:

        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database service is temporarily unavailable",
        )

    # --------------------------------------------------------
    # VERIFY CREDENTIALS
    # --------------------------------------------------------

    if not existing_user:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    try:

        password_valid = verify_password(
            user.password,
            existing_user["password"],
        )

    except Exception:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    if not password_valid:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    # --------------------------------------------------------
    # CREATE JWT
    # --------------------------------------------------------

    try:

        token = create_token(
            {
                "email": existing_user["email"]
            }
        )

    except Exception:

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to create authentication token",
        )

    return {
        "status": "success",
        "access_token": token,
        "token_type": "bearer",
    }


# ============================================================
# CURRENT USER
# ============================================================

@router.get("/me")
def get_me(
    current_user=Depends(get_current_user)
):

    user = db.users.find_one(
        {
            "email": current_user["email"]
        },
        {
            "password": 0
        }
    )

    if not user:

        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    user["_id"] = str(
        user["_id"]
    )

    return user