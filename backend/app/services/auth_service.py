from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user import (
    UserRegister,
    UserLogin
)

from app.utils.security import (
    hash_password,
    verify_password
)

from app.utils.auth import (
    create_access_token,
    verify_token
)


def register_user(
    user_data: UserRegister,
    db: Session
):
    existing_user = (
        db.query(User)
        .filter(User.email == user_data.email)
        .first()
    )

    if existing_user:
        raise ValueError("Email already registered")

    new_user = User(
        email=user_data.email,
        password_hash=hash_password(user_data.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


def login_user(
    user_data: UserLogin,
    db: Session
):
    user = (
        db.query(User)
        .filter(User.email == user_data.email)
        .first()
    )

    if not user:
        raise ValueError("Invalid credentials")

    if not verify_password(
        user_data.password,
        user.password_hash
    ):
        raise ValueError("Invalid credentials")

    token = create_access_token(
        {"sub": str(user.id)}
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }


def get_current_user(
    token: str,
    db: Session
):
    user_id = verify_token(token)

    if not user_id:
        return None

    user = (
        db.query(User)
        .filter(User.id == int(user_id))
        .first()
    )

    return user