from datetime import date, timedelta
from sqlalchemy.orm import Session

from app.models.habit import Habit
from app.models.habit_log import HabitLog

def calculate_consistency(
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
        return None

    logs = (
        db.query(HabitLog)
        .filter(HabitLog.habit_id == habit_id)
        .all()
    )

    if len(logs) == 0:
        return {
            "consistency": 0
        }

    completed = sum(
        1
        for log in logs
        if log.status == "completed"
    )

    score = round(
        (completed / len(logs)) * 100,
        2
    )

    return {
        "habit": habit.name,
        "completed": completed,
        "total_logs": len(logs),
        "consistency": score
    }
def calculate_current_streak(
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
        return None

    logs = (
        db.query(HabitLog)
        .filter(
            HabitLog.habit_id == habit_id,
            HabitLog.status == "completed"
        )
        .order_by(HabitLog.date.desc())
        .all()
    )

    if not logs:
        return {
            "current_streak": 0
        }

    streak = 0
    expected_date = date.today()

    for log in logs:

        if log.date == expected_date:
            streak += 1
            expected_date -= timedelta(days=1)

        elif log.date < expected_date:
            break

    return {
        "current_streak": streak
    }
def calculate_longest_streak(
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
        return None

    logs = (
        db.query(HabitLog)
        .filter(
            HabitLog.habit_id == habit_id
        )
        .order_by(HabitLog.date.asc())
        .all()
    )

    longest = 0
    current = 0

    for log in logs:

        if log.status == "completed":
            current += 1
            longest = max(longest, current)

        else:
            current = 0

    return {
        "longest_streak": longest
    }

def risk_score(
    db: Session,
    habit_id: int,
    user_id: int
):
    consistency = calculate_consistency(
        db,
        habit_id,
        user_id
    )

    if consistency is None:
        return None

    score = consistency["consistency"]

    if score < 40:
        risk = "High"

    elif score < 70:
        risk = "Medium"

    else:
        risk = "Low"

    return {
        "consistency": score,
        "risk": risk
    }



def weekly_summary(
    db: Session,
    user_id: int
):
    week_start = date.today() - timedelta(days=6)

    habits = (
        db.query(Habit)
        .filter(Habit.user_id == user_id)
        .all()
    )

    total_logs = 0
    completed_logs = 0

    strongest_habit = None
    weakest_habit = None

    highest = -1
    lowest = 101

    for habit in habits:

        logs = (
            db.query(HabitLog)
            .filter(
                HabitLog.habit_id == habit.id,
                HabitLog.date >= week_start
            )
            .all()
        )

        total_logs += len(logs)

        completed = sum(
            1
            for log in logs
            if log.status == "completed"
        )

        completed_logs += completed

        if len(logs) > 0:
            score = (completed / len(logs)) * 100

            if score > highest:
                highest = score
                strongest_habit = habit.name

            if score < lowest:
                lowest = score
                weakest_habit = habit.name

    completion_rate = 0

    if total_logs:
        completion_rate = round(
            (completed_logs / total_logs) * 100,
            2
        )

    return {
        "completed": completed_logs,
        "total": total_logs,
        "completion_rate": completion_rate,
        "strongest_habit": strongest_habit,
        "weakest_habit": weakest_habit
    }



def monthly_summary(
    db: Session,
    user_id: int
):
    today = date.today()

    habits = (
        db.query(Habit)
        .filter(Habit.user_id == user_id)
        .all()
    )

    total_logs = 0
    completed_logs = 0

    category_stats = {}

    for habit in habits:

        logs = (
            db.query(HabitLog)
            .filter(
                HabitLog.habit_id == habit.id
            )
            .all()
        )

        monthly_logs = [
            log
            for log in logs
            if log.date.month == today.month
            and log.date.year == today.year
        ]

        total_logs += len(monthly_logs)

        completed = sum(
            1
            for log in monthly_logs
            if log.status == "completed"
        )

        completed_logs += completed

        if habit.category not in category_stats:
            category_stats[habit.category] = {
                "completed": 0,
                "total": 0
            }

        category_stats[habit.category]["completed"] += completed
        category_stats[habit.category]["total"] += len(monthly_logs)

    completion_rate = 0

    if total_logs:
        completion_rate = round(
            (completed_logs / total_logs) * 100,
            2
        )

    best_category = None
    worst_category = None

    highest = -1
    lowest = 101

    for category, stats in category_stats.items():

        if stats["total"] == 0:
            continue

        score = (
            stats["completed"] /
            stats["total"]
        ) * 100

        if score > highest:
            highest = score
            best_category = category

        if score < lowest:
            lowest = score
            worst_category = category

    return {
        "completed": completed_logs,
        "total": total_logs,
        "completion_rate": completion_rate,
        "best_category": best_category,
        "worst_category": worst_category
    }