from pymongo import MongoClient
from bson import ObjectId
import pandas as pd
import uuid

from app.core.config import settings


def get_database():
    # Create a connection using MongoClient.
    client = MongoClient(settings["CONNECTION_STRING"])
    # Create the database
    return client, client[settings["DBNAME"]]


def init_db():
    client, db = get_database()
    # Check if the collection already exists
    if "model_data" in db.list_collection_names():
        pass
    else:
        df = pd.read_csv(settings["MODEL_DATA_PATH"])
        df["id"] = range(len(df))
        db.model_data.insert_many(df.to_dict(orient="records"))
    client.close()


def get_model_data():
    client, db = get_database()
    collection_name = db[settings["MODEL_DATA"]]
    model_data = []
    for data in collection_name.find():
        data["_id"] = str(data["_id"])
        model_data.append(data)

    return client, model_data


def get_model_data_by_id(id):
    client, db = get_database()
    collection_name = db[settings["MODEL_DATA"]]
    model_data = collection_name.find_one({"_id": ObjectId(id)})
    if model_data:
        model_data["_id"] = str(model_data["_id"])
        return client, 1, model_data
    else:
        return client, 0, None


def fetch_user_details(user):
    client, db = get_database()
    collection_name = db[settings["USER_COLLECTION"]]
    user_details = collection_name.find_one({"UserName": user})
    return client, user_details


def update_user_details(user, newValues):
    client, db = get_database()
    collection_name = db[settings["USER_COLLECTION"]]
    collection_name.update_one({}, {"$set": newValues})
    client.close()


def insert_accuracy_detail(accuracy_detail):
    client, db = get_database()
    collection_name = db[settings["ACCURACY_COLLECTION"]]
    accuracy_detail.update({"_id": uuid.uuid4().hex})
    collection_name.insert_one(accuracy_detail)
    client.close()


def insert_model_configs(model_configs):
    client, db = get_database()
    collection_name = db[settings["MODEL_CONFIG"]]
    model_configs.update({"_id": model_configs["UserName"] + model_configs["Cohort"]})
    collection_name.insert_one(model_configs)
    client.close()


def update_model_details(user, newValues):
    client, db = get_database()
    collection_name = db[settings["MODEL_CONFIG"]]
    collection_name.update_one({"UserName": user}, {"$set": newValues})
    client.close()


def insert_interaction_data(interaction_detail):
    client, db = get_database()
    collection_name = db[settings["INTERACTION_COLLECTION"]]
    interaction_detail.update(
        {
            "_id": interaction_detail["user"]
            + interaction_detail["cohort"]
            + uuid.uuid4().hex
        }
    )
    collection_name.insert_one(interaction_detail)
    client.close()
