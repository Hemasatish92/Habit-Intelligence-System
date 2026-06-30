from fastapi import APIRouter, Depends, Header, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.services.auth_service import get_current_user
from app.services import analytics_service

router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
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


@router.get("/dashboard/{habit_id}")
def dashboard(
    habit_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_logged_in_user)
):

    consistency = analytics_service.calculate_consistency(
        db,
        habit_id,
        current_user.id
    )

    streak = analytics_service.calculate_current_streak(
        db,
        habit_id,
        current_user.id
    )

    longest = analytics_service.calculate_longest_streak(
        db,
        habit_id,
        current_user.id
    )

    risk = analytics_service.risk_score(
        db,
        habit_id,
        current_user.id
    )

    return {
        **consistency,
        **streak,
        **longest,
        **risk
    }


@router.get("/weekly")
def weekly(
    db: Session = Depends(get_db),
    current_user=Depends(get_logged_in_user)
):
    return analytics_service.weekly_summary(
        db,
        current_user.id
    )


@router.get("/monthly")
def monthly(
    db: Session = Depends(get_db),
    current_user=Depends(get_logged_in_user)
):
    return analytics_service.monthly_summary(
        db,
        current_user.id
    )


@router.get("/streak/{habit_id}")
def streak(
    habit_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_logged_in_user)
):
    return {
        **analytics_service.calculate_current_streak(
            db,
            habit_id,
            current_user.id
        ),
        **analytics_service.calculate_longest_streak(
            db,
            habit_id,
            current_user.id
        )
    }


@router.get("/risk/{habit_id}")
def risk(
    habit_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_logged_in_user)
):
    return analytics_service.risk_score(
        db,
        habit_id,
        current_user.id
    )