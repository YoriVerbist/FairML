from pymongo import MongoClient, ASCENDING, DESCENDING
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
    if "user_data" in db.list_collection_names():
        pass
    else:
        FEATURES = {
            "id": "0",
            "Age": True,
            "Gender": True,
            "Smoking": True,
            "Hx Smoking": True,
            "Hx Radiothreapy": True,
            "Thyroid Function": True,
            "Physical Examination": True,
            "Adenopathy": True,
            "Pathology": True,
            "Focality": True,
            "Risk": True,
            "T": True,
            "N": True,
            "M": True,
            "Stage": True,
            "Response": True,
        }
        db.user_data.insert_one(FEATURES)

    client.close()


def get_model_data():
    client, db = get_database()
    collection_name = db[settings["MODEL_DATA"]]
    model_data = []
    for data in collection_name.find().sort("id", ASCENDING):
        data["_id"] = str(data["_id"])
        model_data.append(data)

    return client, model_data


def get_model_data_by_id(id):
    client, db = get_database()
    collection_name = db[settings["MODEL_DATA"]]
    model_data = collection_name.find_one({"id": int(id)})
    if model_data:
        model_data["_id"] = str(model_data["_id"])
        return client, 1, model_data
    else:
        return client, 0, None


def fetch_user_details(user_id):
    client, db = get_database()
    collection_name = db[settings["USER_COLLECTION"]]
    user_details = collection_name.find_one({"id": str(user_id)})
    if user_details:
        user_details["_id"] = str(user_details["_id"])
        return client, user_details
    return client, user_details


def create_user(user):
    client, db = get_database()
    collection_name = db[settings["USER_COLLECTION"]]
    FEATURES = {
        "id": user["id"],
        "Age": True,
        "Gender": True,
        "Smoking": True,
        "Hx Smoking": True,
        "Hx Radiothreapy": True,
        "Thyroid Function": True,
        "Physical Examination": True,
        "Adenopathy": True,
        "Pathology": True,
        "Focality": True,
        "Risk": True,
        "T": True,
        "N": True,
        "M": True,
        "Stage": True,
        "Response": True,
    }
    collection_name.insert_one(FEATURES)
    return client, 1


def update_user_details(user_id, newValues):
    client, db = get_database()
    collection_name = db[settings["USER_COLLECTION"]]
    collection_name.update_one({"id": str(user_id)}, {"$set": newValues})
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
