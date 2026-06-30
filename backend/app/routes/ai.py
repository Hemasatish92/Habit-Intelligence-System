from fastapi import APIRouter, Depends, Header, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.services.auth_service import get_current_user
from app.services import ai_service

router = APIRouter(
    prefix="/ai",
    tags=["AI"]
)


def get_logged_in_user(
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

    user = get_current_user(token, db)

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

    return user


@router.post("/recommendation/{habit_id}")
def recommendation(
    habit_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_logged_in_user)
):
    return ai_service.generate_recommendation(
        db,
        habit_id,
        current_user.id
    )


@router.post("/summary")
def summary(
    db: Session = Depends(get_db),
    current_user=Depends(get_logged_in_user)
):
    return ai_service.generate_weekly_summary(
        db,
        current_user.id
    )


@router.post("/analyze/{habit_id}")
def analyze(
    habit_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_logged_in_user)
):
    return ai_service.generate_habit_analysis(
        db,
        habit_id,
        current_user.id
    )