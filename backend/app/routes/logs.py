from fastapi import APIRouter, Depends, Header, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.services import log_service

from app.database import get_db
from app.schemas.log import (
    LogCreate,
    LogResponse
)

from app.services import log_service
from app.services.auth_service import get_current_user

router = APIRouter(
    prefix="/logs",
    tags=["Logs"]
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


@router.post("/", response_model=LogResponse)
def create_log(
    log: LogCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_logged_in_user)
):
    return log_service.create_log(
        db,
        log,
        current_user.id
    )


@router.get("/", response_model=List[LogResponse])
def get_all_logs(
    db: Session = Depends(get_db),
    current_user=Depends(get_logged_in_user)
):
    return log_service.get_logs(
        db,
        current_user.id
    )


@router.get("/{habit_id}", response_model=List[LogResponse])
def get_logs_by_habit(
    habit_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_logged_in_user)
):
    return log_service.get_logs_by_habit(
        db,
        habit_id,
        current_user.id
    )
@router.delete("/today/{habit_id}")
def delete_today_log_route(
    habit_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_logged_in_user)
):
    return log_service.delete_today_log(
        db=db,
        habit_id=habit_id,
        user_id=current_user.id
    )