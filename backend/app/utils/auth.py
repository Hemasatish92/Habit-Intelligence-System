from datetime import datetime, timedelta
from jose import jwt, JWTError

from app.config import (
    SECRET_KEY,
    ALGORITHM,
    TOKEN_EXPIRY
)


def create_access_token(data: dict):
    """
    Generate JWT token
    """

    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(
        minutes=TOKEN_EXPIRY
    )

    to_encode.update(
        {"exp": expire}
    )

    encoded_jwt = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return encoded_jwt


def verify_token(token: str):
    """
    Verify JWT token and return user id
    """

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        user_id = payload.get("sub")

        if user_id is None:
            return None

        return user_id

    except JWTError:
        return None