from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError

from app.utils.security import SECRET_KEY, ALGORITHM


security = HTTPBearer()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):

    token = credentials.credentials

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        email = payload.get("email")

        if not email:

            raise HTTPException(
                status_code=401,
                detail="Invalid authentication token"
            )

        return {
            "email": email
        }

    except JWTError:

        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )