from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    Header
)

from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.user import (
    UserRegister,
    UserLogin,
    UserResponse
)

from app.services.auth_service import (
    register_user,
    login_user,
    get_current_user
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post(
    "/register",
    response_model=UserResponse
)
def register(
    user: UserRegister,
    db: Session = Depends(get_db)
):
    try:
        return register_user(
            user,
            db
        )

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


@router.post("/login")
def login(
    user: UserLogin,
    db: Session = Depends(get_db)
):
    try:
        return login_user(
            user,
            db
        )

    except ValueError as e:
        raise HTTPException(
            status_code=401,
            detail=str(e)
        )


@router.get(
    "/me",
    response_model=UserResponse
)
def me(
    authorization: str = Header(...),
    db: Session = Depends(get_db)
):
    try:
        token = authorization.split(" ")[1]

    except Exception:
        raise HTTPException(
            status_code=401,
            detail="Invalid token format"
        )

    user = get_current_user(
        token,
        db
    )

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

    return user