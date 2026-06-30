from datetime import datetime

from pydantic import BaseModel


class NotificationCreate(BaseModel):
    message: str


class NotificationResponse(BaseModel):
    id: int
    user_id: int
    message: str
    created_at: datetime

    class Config:
        from_attributes = True