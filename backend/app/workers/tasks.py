from datetime import datetime

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.config import DATABASE_URL
from app.workers.celery_app import celery

from app.services.notification_service import create_notification


engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)


@celery.task
def send_daily_reminder(user_id: int):

    db = SessionLocal()

    try:

        create_notification(
            db,
            user_id,
            "Don't forget to complete today's habits!"
        )

        return {
            "message": "Daily reminder sent.",
            "time": str(datetime.now())
        }

    finally:
        db.close()


@celery.task
def generate_weekly_summary(user_id: int):

    db = SessionLocal()

    try:

        create_notification(
            db,
            user_id,
            "Your weekly habit summary is ready."
        )

        return {
            "message": "Weekly summary generated.",
            "time": str(datetime.now())
        }

    finally:
        db.close()


@celery.task
def generate_ai_report(user_id: int):

    db = SessionLocal()

    try:

        create_notification(
            db,
            user_id,
            "Your AI habit analysis has been generated."
        )

        return {
            "message": "AI report generated.",
            "time": str(datetime.now())
        }

    finally:
        db.close()


@celery.task
def cleanup_old_cache():

    return {
        "message": "Cache cleaned.",
        "time": str(datetime.now())
    }