import google.generativeai as genai

from sqlalchemy.orm import Session

from app.config import GEMINI_API_KEY

from app.models.ai_insight import AIInsight
from app.models.habit import Habit

from app.services.analytics_service import (
    calculate_consistency,
    calculate_current_streak,
    calculate_longest_streak,
    risk_score,
    weekly_summary
)

genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-2.5-flash")


def generate_recommendation(
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
        return {
            "message": "Habit not found"
        }

    consistency = calculate_consistency(
        db,
        habit_id,
        user_id
    )["consistency"]

    current = calculate_current_streak(
        db,
        habit_id,
        user_id
    )["current_streak"]

    longest = calculate_longest_streak(
        db,
        habit_id,
        user_id
    )["longest_streak"]

    risk = risk_score(
        db,
        habit_id,
        user_id
    )["risk"]

    prompt = f"""
You are an AI Habit Coach.

Habit: {habit.name}

Consistency: {consistency}%

Current Streak: {current}

Longest Streak: {longest}

Risk Level: {risk}

Provide:

1. Weaknesses

2. Improvement suggestions

3. Practical advice

Keep the response under 100 words.
"""

    response = model.generate_content(prompt)

    insight = AIInsight(
        user_id=user_id,
        habit_id=habit_id,
        insight=response.text
    )

    db.add(insight)
    db.commit()
    db.refresh(insight)

    return {
        "habit": habit.name,
        "recommendation": response.text
    }


def generate_weekly_summary(
    db: Session,
    user_id: int
):
    analytics = weekly_summary(
        db,
        user_id
    )

    prompt = f"""
You are an AI productivity coach.

Weekly Report

Completed Habits:
{analytics['completed']}

Total Habit Logs:
{analytics['total']}

Completion Rate:
{analytics['completion_rate']}%

Strongest Habit:
{analytics['strongest_habit']}

Weakest Habit:
{analytics['weakest_habit']}

Generate a motivational weekly report.

Limit response to 120 words.
"""

    response = model.generate_content(prompt)
    insight = AIInsight(
        user_id=user_id,
        habit_id=0,   # or make habit_id nullable in the model
        insight=response.text
    )

    db.add(insight)
    db.commit()
    return {
        "summary": response.text
    }


def generate_habit_analysis(
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
        return {
            "message": "Habit not found"
        }

    consistency = calculate_consistency(
        db,
        habit_id,
        user_id
    )["consistency"]

    streak = calculate_current_streak(
        db,
        habit_id,
        user_id
    )["current_streak"]

    longest = calculate_longest_streak(
        db,
        habit_id,
        user_id
    )["longest_streak"]

    risk = risk_score(
        db,
        habit_id,
        user_id
    )["risk"]

    prompt = f"""
You are an expert habit coach.

Habit:
{habit.name}

Consistency:
{consistency}%

Current Streak:
{streak}

Longest Streak:
{longest}

Risk:
{risk}

Analyze:

1. Behaviour pattern

2. Why consistency changes

3. Three practical improvements

Maximum 150 words.
"""

    response = model.generate_content(prompt)

    insight = AIInsight(
        user_id=user_id,
        habit_id=habit_id,
        insight=response.text
    )

    db.add(insight)
    db.commit()
    db.refresh(insight)

    return {
        "habit": habit.name,
        "analysis": response.text
    }