from datetime import date

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.habit import Habit
from app.models.habit_log import HabitLog
from app.schemas.log import LogCreate

from app.services.cache_service import delete_cache


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

    # Clear analytics cache
    delete_cache(f"weekly_user_{user_id}")
    delete_cache(f"monthly_user_{user_id}")

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


def delete_today_log(
    db: Session,
    habit_id: int,
    user_id: int
):
    # Verify habit belongs to user
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
            status_code=404,
            detail="Habit not found"
        )

    # Find today's log
    log = (
        db.query(HabitLog)
        .filter(
            HabitLog.habit_id == habit_id,
            HabitLog.date == date.today()
        )
        .first()
    )

    if not log:
        raise HTTPException(
            status_code=404,
            detail="Today's log not found"
        )

    db.delete(log)
    db.commit()

    # Clear analytics cache
    delete_cache(f"weekly_user_{user_id}")
    delete_cache(f"monthly_user_{user_id}")

    return {
        "message": "Today's habit log deleted successfully"
    }