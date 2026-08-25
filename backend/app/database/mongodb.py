from pymongo import MongoClient
from app.config import settings


client = MongoClient(settings.MONGO_URL)

database = client[settings.DATABASE_NAME]


def get_database():
    return database