from pydantic import BaseModel, ConfigDict, Field
from datetime import date


class LogCreate(BaseModel):
    habit_id: int
    status: str = Field(pattern="^(completed|skipped)$")


class LogResponse(BaseModel):
    id: int
    habit_id: int
    date: date
    status: str

    model_config = ConfigDict(from_attributes=True)