# app/models/habit_log.py

from sqlalchemy import Column, Integer, String, Date, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database import Base


class HabitLog(Base):
    __tablename__ = "habit_logs"

    id = Column(Integer, primary_key=True, index=True)

    habit_id = Column(
        Integer,
        ForeignKey("habits.id", ondelete="CASCADE"),
        nullable=False
    )

    date = Column(Date, nullable=False)

    status = Column(
        String,
        nullable=False,
        default="completed"
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    habit = relationship(
        "Habit",
        back_populates="logs"
    )