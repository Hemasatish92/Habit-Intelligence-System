# app/services/habit_service.py

from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from app.models.habit import Habit
from app.schemas.habit import HabitCreate, HabitUpdate


def create_habit(db: Session, habit: HabitCreate, user_id: int):
    new_habit = Habit(
        user_id=user_id,
        name=habit.name,
        category=habit.category,
        frequency_type=habit.frequency_type,
        target_per_week=habit.target_per_week
    )

    db.add(new_habit)
    db.commit()
    db.refresh(new_habit)

    return new_habit


def get_all_habits(db: Session, user_id: int):
    return (
        db.query(Habit)
        .filter(Habit.user_id == user_id)
        .all()
    )


def get_habit_by_id(db: Session, habit_id: int, user_id: int):
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

    return habit


def update_habit(
    db: Session,
    habit_id: int,
    habit_data: HabitUpdate,
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

    update_data = habit_data.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(habit, key, value)

    db.commit()
    db.refresh(habit)

    return habit


def delete_habit(
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

    db.delete(habit)
    db.commit()

    return {
        "message": "Habit deleted successfully"
    }