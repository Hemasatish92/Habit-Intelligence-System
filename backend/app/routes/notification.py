from fastapi import APIRouter, Depends, Header, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.services.auth_service import get_current_user
from app.services.notification_service import (
    create_notification,
    get_notifications
)
from app.schemas.notification import NotificationCreate

router = APIRouter(
    prefix="/notifications",
    tags=["Notifications"]
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


@router.get("/")
def get_all_notifications(
    db: Session = Depends(get_db),
    current_user=Depends(get_logged_in_user)
):
    return get_notifications(
        db,
        current_user.id
    )


@router.post("/")
def add_notification(
    notification: NotificationCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_logged_in_user)
):
    return create_notification(
        db,
        current_user.id,
        notification.message
    )