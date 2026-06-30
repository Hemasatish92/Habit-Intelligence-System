# AI-Powered Habit Intelligence System

## Project Overview

AI-Powered Habit Intelligence System is a production-ready full-stack web application that helps users build consistent habits, monitor progress, and receive AI-powered recommendations based on their activity.

The application combines FastAPI, React, PostgreSQL, Redis, Celery, and Docker to provide a scalable and modern habit-tracking platform.

---

## Features

### Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes

### Habit Management

- Create Habit
- Edit Habit
- Delete Habit
- Mark Habit Complete
- Undo Today's Completion

### Analytics

- Weekly Analytics
- Monthly Analytics
- Current Streak
- Longest Streak
- Consistency Score
- Risk Analysis

### AI Features

- AI Habit Coach
- AI Recommendations
- Weekly AI Summary

### Production Features

- Redis Caching
- Celery Background Workers
- Docker
- Docker Compose

---

## Tech Stack

### Frontend

- React
- Tailwind CSS
- Axios
- React Router
- Recharts

### Backend

- FastAPI
- SQLAlchemy
- JWT Authentication
- Pydantic

### Database

- PostgreSQL

### AI

- Google Gemini API

### Infrastructure

- Redis
- Celery
- Docker
- Docker Compose

---

## Project Structure

```text
habit-intelligence-system/

backend/
frontend/
docs/
docker-compose.yml
README.md
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd Habit-Intelligence-System
```

### Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt
```

### Frontend

```bash
cd frontend

npm install
```

### Start using Docker

```bash
docker compose up --build
```

---

## Environment Variables

Create a `.env` file inside the backend.

Example:

```env
DATABASE_URL=
SECRET_KEY=
ALGORITHM=
TOKEN_EXPIRY=
GEMINI_API_KEY=
REDIS_URL=
```

---

## API Endpoints

### Authentication

- POST /auth/register
- POST /auth/login

### Habits

- GET /habits
- POST /habits
- PUT /habits/{id}
- DELETE /habits/{id}

### Logs

- POST /logs
- GET /logs

### Analytics

- GET /analytics/weekly
- GET /analytics/monthly
- GET /analytics/dashboard/{habit_id}

### AI

- POST /ai/recommendation
- POST /ai/summary
- POST /ai/analyze

---

## Future Improvements

- Email Notifications
- Mobile Application
- OAuth Login
- Habit Sharing
- Team Challenges

---

## Author

Hema S

Bachelor of Engineering (Computer Science)

2026 Graduate