from fastapi import APIRouter, Depends
import pandas as pd

from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC

from app.core.db import get_database, insert_model_configs
from app.core.config import settings


def load_training_data(filters=None, selected_features=None):
    """Loads training data"""
    data = pd.read_csv("../../data/Thyroid_Diff.csv")

    if selected_features:
        data = data[selected_features + ["Recurred"]]

    x_data = data.drop("Recurred", axis="columns")
    y_data = data["Recurred"]

    return x_data, y_data


def train_model_service(X_train, y_train, selected_features=None):
    svm_classifier = SVC(
        kernel="linear", probability=True
    )  # Linear kernel for simplicity, can be changed

    if selected_features:
        X_train = X_train[selected_features]

    # Train the SVM classifier
    svm_classifier.fit(X_train, y_train)

    return svm_classifier


def login_service(user_name, cohort, language):
    """
    Method to relieve user details if exists
    or create a new user if doesn't exist
    """
    client, db = get_database()
    collection_name = db[settings.USER_COLLECTION]
    user_details = collection_name.find_one({"UserName": user_name})

    # find and update last login time
    if user_details is None:
        print("Record Not Found")
        new_user = settings.USER_DETAIL_JSON
        new_user["UserName"] = user_name
        new_user["Cohort"] = cohort
        new_user["Language"] = language
        new_user.update({"_id": user_name + cohort})
        collection_name.insert_one(new_user)
        user_details = collection_name.find_one({"UserName": user_name})
        client.close()
        model_configs = {
            "UserName": user_name,
            "Cohort": cohort,
            "AutoCorrectConfig": {
                "outlier": False,
                "correlation": False,
                "skew": False,
                "imbalance": False,
                "drift": False,
                "duplicate": False,
            },
        }
        insert_model_configs(model_configs)
        return (True, f"New record created for user: {user_name}", user_details)
    else:
        print("Record found")
        client.close()
        return (True, f"Record found for user: {user_name}", user_details)


def save_interaction_data(config_data):
    """
    Method to store interaction data
    """
    interaction_detail = {
        "user": config_data.UserId,
        "cohort": config_data.Cohort,
        "viz": config_data.JsonData["viz"],
        "eventType": config_data.JsonData["eventType"],
        "description": config_data.JsonData["description"],
        "timestamp": config_data.JsonData["timestamp"],
        "duration": config_data.JsonData["duration"],
    }
    # insert_interaction_data(interaction_detail) -- Disabling interaction logs
    return (
        True,
        f"Successful. Interaction data inserted for user: {config_data.UserId}",
        interaction_detail,
    )
