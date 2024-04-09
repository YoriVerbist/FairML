import pandas as pd

from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC

from app.core.db import get_database, insert_model_configs
from app.core.config import settings


def load_training_data(filters=None, selected_features=None):
    """Loads training data"""
    df = pd.read_csv("../data/Thyroid_Diff.csv")

    if selected_features:
        df = df[selected_features + ["Recurred"]]

    X = df.drop("Recurred", axis="columns")
    X = pd.get_dummies(X, columns=X.columns.tolist(), drop_first=True)
    y = df["Recurred"]

    X_train, _, y_train, _ = train_test_split(X, y, test_size=0.2, random_state=42)

    return X_train, y_train


def load_testing_data(selected_features=None):
    """Loads test data"""
    df = pd.read_csv("../data/Thyroid_Diff.csv")

    if selected_features:
        df = df[selected_features + ["Recurred"]]

    X = df.drop("Recurred", axis="columns")
    X = pd.get_dummies(X, columns=X.columns.tolist(), drop_first=True)

    y = df["Recurred"]

    _, X_test, _, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    return X_test, y_test


def train_model(X_train, y_train):
    svm_classifier = SVC(
        kernel="linear", probability=True
    )  # Linear kernel for simplicity, can be changed

    # Train the SVM classifier
    svm_classifier.fit(X_train, y_train)

    return svm_classifier


def evaluate_model(svm_classifier, X_test, y_test):
    """Evaluate the model on the test data and return the accuracy and the probabilities of the predictions"""

    # Predict on the test set
    y_pred = svm_classifier.predict(X_test)

    # Calculate accuracy
    accuracy = accuracy_score(y_test, y_pred)

    # Get the probabilities of the predictions
    probabilities = svm_classifier.predict_proba(X_test)

    return accuracy, probabilities, y_pred


def login_service(user_name, cohort, language):
    """
    Method to relieve user details if exists
    or create a new user if doesn't exist
    """
    client, db = get_database()
    collection_name = db[settings["USER_COLLECTION"]]
    user_details = collection_name.find_one({"UserName": user_name})

    # find and update last login time
    if user_details is None:
        print("Record Not Found")
        new_user = settings["USER_DETAIL_JSON"]
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
