from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine

# Import models so SQLAlchemy creates the tables
from app.models import user, habit_log

# Import routers
from app.routes.auth import router as auth_router
from app.routes.habits import router as habits_router
from app.models import habit
from app.models import ai_insight
from app.routes.ai import router as ai_router
from app.routes.logs import router as logs_router
from app.routes.analytics import router as analytics_router

app = FastAPI(
    title="Habit Intelligence System",
    description="""
## AI Habit Tracker Backend

Features:
- User Registration
- User Login
- JWT Authentication
- Habit Management
- Habit Analytics
- AI Insights
""",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(auth_router)
app.include_router(habits_router)
app.include_router(logs_router)
app.include_router(analytics_router)
app.include_router(ai_router)
@app.get("/")
def root():
    return {
        "message": "Habit Intelligence System API"
    }