# app/schemas/habit.py

from pydantic import BaseModel, Field, ConfigDict
from typing import Optional


class HabitBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    category: str = Field(..., min_length=2, max_length=50)
    frequency_type: str = Field(..., pattern="^(Daily|Weekly)$")
    target_per_week: int = Field(..., ge=1, le=7)


class HabitCreate(HabitBase):
    pass


class HabitUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=2, max_length=100)
    category: Optional[str] = Field(None, min_length=2, max_length=50)
    frequency_type: Optional[str] = Field(None, pattern="^(Daily|Weekly)$")
    target_per_week: Optional[int] = Field(None, ge=1, le=7)


class HabitResponse(HabitBase):
    id: int
    user_id: int

    model_config = ConfigDict(from_attributes=True)