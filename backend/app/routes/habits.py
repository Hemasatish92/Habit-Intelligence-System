from fastapi import APIRouter, Depends, Header, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db

from app.schemas.habit import (
    HabitCreate,
    HabitUpdate,
    HabitResponse
)

from app.services import habit_service
from app.services.auth_service import get_current_user

router = APIRouter(
    prefix="/habits",
    tags=["Habits"]
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


@router.post("/", response_model=HabitResponse)
def create_habit(
    habit: HabitCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_logged_in_user)
):
    return habit_service.create_habit(
        db,
        habit,
        current_user.id
    )


@router.get("/", response_model=List[HabitResponse])
def get_all_habits(
    db: Session = Depends(get_db),
    current_user=Depends(get_logged_in_user)
):
    return habit_service.get_all_habits(
        db,
        current_user.id
    )


@router.get("/{habit_id}", response_model=HabitResponse)
def get_habit(
    habit_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_logged_in_user)
):
    return habit_service.get_habit_by_id(
        db,
        habit_id,
        current_user.id
    )


@router.put("/{habit_id}", response_model=HabitResponse)
def update_habit(
    habit_id: int,
    habit: HabitUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_logged_in_user)
):
    return habit_service.update_habit(
        db,
        habit_id,
        habit,
        current_user.id
    )


@router.delete("/{habit_id}")
def delete_habit(
    habit_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_logged_in_user)
):
    return habit_service.delete_habit(
        db,
        habit_id,
        current_user.id
    )