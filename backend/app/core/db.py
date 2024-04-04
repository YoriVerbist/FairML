from pymongo import MongoClient
import uuid

from app.core.config import settings


def get_database():
    # Create a connection using MongoClient.
    client = MongoClient(settings.CONNECTION_STRING)
    # Create the database
    return client, client[settings.DBNAME]


def fetch_user_details(user):
    client, db = get_database()
    collection_name = db[settings.USER_COLLECTION]
    user_details = collection_name.find_one({"UserName": user})
    return client, user_details


def update_user_details(user, newValues):
    client, db = get_database()
    collection_name = db[settings.USER_COLLECTION]
    collection_name.update_one({"UserName": user}, {"$set": newValues})
    client.close()

def insert_accuracy_detail(accuracy_detail):
    client, db = get_database()
    collection_name = db[settings.ACCURACY_COLLECTION]
    accuracy_detail.update({"_id": uuid.uuid4().hex})
    collection_name.insert_one(accuracy_detail)
    client.close()


def insert_model_configs(model_configs):
    client, db = get_database()
    collection_name = db[settings.MODEL_CONFIG]
    model_configs.update(
        {"_id": model_configs["UserName"]+model_configs["Cohort"]})
    collection_name.insert_one(model_configs)
    client.close()


def update_model_details(user, newValues):
    client, db = get_database()
    collection_name = db[settings.MODEL_CONFIG]
    collection_name.update_one({"UserName": user}, {"$set": newValues})
    client.close()


def insert_interaction_data(interaction_detail):
    client, db = get_database()
    collection_name = db[settings.INTERACTIONS_COLLECTION]
    interaction_detail.update(
        {"_id": interaction_detail["user"]+interaction_detail["cohort"]+uuid.uuid4().hex})
    collection_name.insert_one(interaction_detail)
    client.close()
