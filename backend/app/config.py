# app/config.py

from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
TOKEN_EXPIRY = int(os.getenv("TOKEN_EXPIRY"))
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")