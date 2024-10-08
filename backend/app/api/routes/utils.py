import pandas as pd
import numpy as np
import os

from app.core.config import settings
from app.core.db import get_database

from sklearn.metrics import accuracy_score
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC

import shap

from langchain import hub
from langchain_core.tools import tool
from langchain.agents import AgentExecutor, create_openai_tools_agent
from langchain_openai import ChatOpenAI


from sqlalchemy import create_engine


os.environ["OPENAI_API_KEY"] = settings["OPENAPI_KEY"]


def load_training_data(id=None, filters=None, selected_features=None):
    """
    Loads training data
    """
    df = pd.read_csv("./data/Thyroid_Diff.csv")

    if id:
        df = df.drop(id)

    if selected_features:
        selected_features = [
            feature
            for feature, value in selected_features.items()
            if value and feature in df.columns
        ]
        df = df[selected_features + ["Recurred"]]

    df = transform_to_numerical(df)

    X = df.drop("Recurred", axis="columns")
    y = df["Recurred"]

    X_train, _, y_train, _ = train_test_split(X, y, test_size=0.2, random_state=42)

    return X_train, y_train


def load_testing_data(id=None, selected_features=None):
    """
    Loads test data
    """
    df = pd.read_csv("./data/Thyroid_Diff.csv")

    if selected_features:
        selected_features = [
            feature
            for feature, value in selected_features.items()
            if value and feature in df.columns
        ]
        df = df[selected_features + ["Recurred"]]

    df = transform_to_numerical(df)

    X = df.drop("Recurred", axis="columns")
    y = df["Recurred"]

    if id:
        X_test = X.iloc[[id]]
        y = y[[id]]

        return X_test, y

    _, X_test, _, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    return X_test, y_test


def train_model(X_train, y_train):
    """
    Trains a SVM model with a training set
    """

    model = SVC(kernel="linear", probability=True)
    # Train the model
    model.fit(X_train, y_train)

    return model


def evaluate_model(svm_classifier, X_test, y_test):
    """
    Evaluate the model on the test data and return the accuracy and the probabilities of
    the predictions
    """

    # Predict on the test set
    y_pred = svm_classifier.predict(X_test)

    # Calculate accuracy
    accuracy = accuracy_score(y_test, y_pred)

    # Get the probabilities of the predictions
    probabilities = svm_classifier.predict_proba(X_test)

    return accuracy, probabilities, y_pred


def get_feature_importances(model, X_train, X_test, id=0):
    """
    Calculates the feature importances of the dataset with shap
    """

    # Calculate permutation importance
    explainer = shap.Explainer(model, X_train)

    # Calculate SHAP values for the test set
    shap_values = explainer(X_test)
    vals = np.abs(shap_values.values).mean(0)
    vals /= sum(vals)
    feature_names = X_test.columns

    return vals, feature_names


def get_variable_importance(model, X_train, X_test, feature, id=0):
    """
    Calculates the variable importances of a specific feature with shap
    """

    # Calculate permutation importance
    explainer = shap.Explainer(model, X_train)

    # Calculate SHAP values for the test set
    shap_values = explainer(X_test)

    shap_values = shap_values[:, feature]

    averages = caluclate_averages(
        shap_values.data.tolist(), shap_values.values.tolist()
    )

    return sorted(averages)


def get_recurrence_rate(feature):
    """
    Calculates the cancer recurrence rate based on a specific feature
    """
    df = pd.read_csv("./data/Thyroid_Diff.csv")
    df["Recurred"] = df["Recurred"].map({"Yes": 1, "No": 0})
    recurrence = df.groupby(feature)["Recurred"].mean()
    recurrence = dict(zip(recurrence.index, recurrence.values))
    return recurrence


def caluclate_averages(keys, values):
    sums = {}
    counts = {}

    # Iterate over the data and calculate sums and counts for each key
    for key, values in zip(keys, values):
        if key not in sums:
            sums[key] = [0, 0]  # Initialize sums to [0, 0] for each key
            counts[key] = 0  # Initialize counts to 0 for each key
        sums[key][0] += values[0]  # Add the first value to the sum
        sums[key][1] += values[1]  # Add the second value to the sum
        counts[key] += 1  # Increment the count

    # Calculate the average for each key
    averages = {
        key: [sum_value / counts[key] for sum_value in sum_values]
        for key, sum_values in sums.items()
    }

    return averages.items()


def transform_to_numerical(data):
    if "Age" in data.columns:
        categorical_columns = data.drop("Age", axis=1).columns
    else:
        categorical_columns = data.columns
    le = LabelEncoder()
    for feat in categorical_columns:
        le.fit(data[feat])
        data[feat] = le.transform(data[feat])

    return data


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


def answer_question(user_input, chat_history):
    """
    Gives the user input to the agent
    """

    tools = [
        get_data_tool,
        evaluate_model_tool,
        get_feature_importances_tool,
    ]
    prompt = hub.pull("hwchase17/openai-tools-agent")
    llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0)

    agent = create_openai_tools_agent(llm, tools, prompt)
    agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)
    response = agent_executor.invoke(
        {"input": user_input, "chat_history": chat_history}
    )
    return response


def load_data(removed_features: list = []):
    """
    Loads model data

    Argument removed_features can be used to give a list, the features in this list
    will be excluded from the dataset
    """
    df = pd.read_csv("./data/Thyroid_Diff.csv")
    df = transform_to_numerical(df)
    for i, val in enumerate(removed_features):
        removed_features[i] = removed_features[i].title()

    X = df.drop("Recurred", axis="columns")
    X = X.drop(removed_features, axis="columns")
    y = df["Recurred"]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    return X_train, y_train, X_test, y_test


@tool
def get_data_tool():
    """Loads the data into a pandas DataFrame"""
    df = pd.read_csv("./data/Thyroid_Diff.csv")
    return df


@tool
def evaluate_model_tool(removed_features: list = []):
    """
    Evaluate the model on the test data and return the accuracy and the probabilities of
    the predictions
    Argument removed_features can be used to give a list, the features in this list
    will be excluded from the dataset
    """
    X_train, y_train, X_test, y_test = load_data(removed_features)
    model = train_model(X_train, y_train)
    # Predict on the test set
    y_pred = model.predict(X_test)
    # Calculate accuracy
    accuracy = accuracy_score(y_test, y_pred)
    # Get the probabilities of the predictions
    probabilities = model.predict_proba(X_test)
    return accuracy, probabilities, y_pred


@tool
def get_feature_importances_tool(removed_features: list = []):
    """
    Calculates the feature importances of the dataset with shap
    and returns them in percentage form with also the corresonding feature names

    The removed_features argument can be used to calculate the feature values of
    while excluding the given list
    """
    X_train, y_train, X_test, y_test = load_data(removed_features)
    model = train_model(X_train, y_train)
    # Calculate permutation importance
    explainer = shap.Explainer(model, X_train)

    # Calculate SHAP values for the test set
    shap_values = explainer(X_test)
    vals = np.abs(shap_values.values).mean(0)
    vals /= sum(vals)
    feature_names = X_test.columns

    # Zip the two lists together to create a list of tuples
    combined_list = list(zip(feature_names, vals))

    # Convert the list of tuples into a dictionary
    my_dict = dict(combined_list)
    sorted_dict = dict(sorted(my_dict.items(), key=lambda item: item[1], reverse=True))

    return sorted_dict.keys(), sorted_dict.values()
