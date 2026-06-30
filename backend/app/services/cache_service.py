import json
import redis

from app.config import REDIS_URL

redis_client = redis.Redis.from_url(
    REDIS_URL,
    decode_responses=True
)


def get_cache(key: str):
    try:
        value = redis_client.get(key)

        if value:
            return json.loads(value)

        return None

    except Exception as e:
        print(f"Redis GET Error: {e}")
        return None


def set_cache(key: str, value, expiry: int = 300):
    try:
        redis_client.setex(
            key,
            expiry,
            json.dumps(value)
        )

    except Exception as e:
        print(f"Redis SET Error: {e}")


def delete_cache(key: str):
    try:
        redis_client.delete(key)

    except Exception as e:
        print(f"Redis DELETE Error: {e}")


def clear_all_cache():
    try:
        redis_client.flushdb()

    except Exception as e:
        print(f"Redis CLEAR Error: {e}")