import json
import redis

from app.config import REDIS_URL

redis_client = redis.Redis.from_url(
    REDIS_URL,
    decode_responses=True
)


def get_cache(key: str):
    """
    Get cached data.
    """
    value = redis_client.get(key)

    if value:
        return json.loads(value)

    return None


def set_cache(
    key: str,
    value,
    expiry: int = 300
):
    """
    Cache data.

    Default expiry:
    5 minutes
    """

    redis_client.setex(
        key,
        expiry,
        json.dumps(value)
    )


def delete_cache(key: str):
    """
    Delete one cache entry.
    """

    redis_client.delete(key)


def clear_all_cache():
    """
    Remove every cache entry.

    Useful while developing.
    """

    redis_client.flushdb()