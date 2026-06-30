from datetime import date

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.habit import Habit
from app.models.habit_log import HabitLog
from app.schemas.log import LogCreate


def create_log(
    db: Session,
    log_data: LogCreate,
    user_id: int
):
    # Check whether the habit belongs to the logged-in user
    habit = (
        db.query(Habit)
        .filter(
            Habit.id == log_data.habit_id,
            Habit.user_id == user_id
        )
        .first()
    )

    if not habit:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Habit not found"
        )

    today = date.today()

    # Prevent duplicate logs
    existing_log = (
        db.query(HabitLog)
        .filter(
            HabitLog.habit_id == log_data.habit_id,
            HabitLog.date == today
        )
        .first()
    )

    if existing_log:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Habit already logged today"
        )

    new_log = HabitLog(
        habit_id=log_data.habit_id,
        date=today,
        status=log_data.status
    )

    db.add(new_log)
    db.commit()
    db.refresh(new_log)

    return new_log


def get_logs(
    db: Session,
    user_id: int
):
    return (
        db.query(HabitLog)
        .join(Habit)
        .filter(Habit.user_id == user_id)
        .all()
    )


def get_logs_by_habit(
    db: Session,
    habit_id: int,
    user_id: int
):
    habit = (
        db.query(Habit)
        .filter(
            Habit.id == habit_id,
            Habit.user_id == user_id
        )
        .first()
    )

    if not habit:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Habit not found"
        )

    return (
        db.query(HabitLog)
        .filter(HabitLog.habit_id == habit_id)
        .all()
    )