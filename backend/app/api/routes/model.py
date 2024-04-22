from typing import Any

from fastapi import APIRouter, HTTPException

from app.models import OutputwithPayloadDataModel
from app.api.routes.utils import (
    load_training_data,
    load_testing_data,
    train_model,
    evaluate_model,
    get_feature_importances,
    get_variable_importance,
    get_recurrence_rate,
)
from app.core.db import fetch_user_details, update_user_details

router = APIRouter()

FEATURES = {
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


@router.get("/", response_model=OutputwithPayloadDataModel)
def get_model(user_id: str = "0") -> Any:
    """
    Retrieve all the data from the model.
    """
    _, FEATURES = fetch_user_details(user_id)

    print(FEATURES)
    X_train, y_train = load_training_data(selected_features=FEATURES)
    x_test, y_test = load_testing_data(selected_features=FEATURES)
    model = train_model(X_train, y_train)
    accuracy, probabilities, y_pred = evaluate_model(model, x_test, y_test)
    response = {
        "StatusCode": 1,
        "StatusMessage": "Success",
        "Payload": {
            "acuracy": accuracy,
            "probabilities": probabilities.tolist(),
            "y_pred": y_pred.tolist(),
        },
    }
    return response


@router.get("/{id}", response_model=OutputwithPayloadDataModel)
def predict_single_datapoint(id: int, user_id: str = "0") -> Any:
    """
    Retrieve all the data from the model.
    """
    _, FEATURES = fetch_user_details(user_id)
    X_train, y_train = load_training_data(id, selected_features=FEATURES)
    X_test, y_test = load_testing_data(id, selected_features=FEATURES)
    model = train_model(X_train, y_train)
    accuracy, probabilities, y_pred = evaluate_model(model, X_test, y_test)
    response = {
        "StatusCode": 1,
        "StatusMessage": "Success",
        "Payload": {
            "acuracy": accuracy,
            "probabilities": probabilities.tolist(),
            "y_pred": y_pred.tolist(),
        },
    }
    return response


@router.get("/importances/", response_model=OutputwithPayloadDataModel)
def get_importances(user_id: str = "0") -> Any:
    """
    Retrieve the importances of the features.
    """
    _, FEATURES = fetch_user_details(user_id)
    X_train, y_train = load_training_data(selected_features=FEATURES)
    X_test, _ = load_testing_data(selected_features=FEATURES)
    print("importance features", FEATURES)
    model = train_model(X_train, y_train)

    importances = get_feature_importances(model.predict_proba, X_train, X_test)
    response = {
        "StatusCode": 1,
        "StatusMessage": "Success",
        "Payload": {"importances": importances.tolist()},
    }
    return response


@router.get("/importances/{id}", response_model=OutputwithPayloadDataModel)
def get_importances_id(id: int, user_id: str = "0") -> Any:
    """
    Retrieve the importances of the features.
    """
    _, FEATURES = fetch_user_details(user_id)
    X_train, y_train = load_training_data(selected_features=FEATURES)
    X_test, _ = load_testing_data(selected_features=FEATURES)
    model = train_model(X_train, y_train)

    importances = get_feature_importances(model.predict_proba, X_train, X_test, id)
    response = {
        "StatusCode": 1,
        "StatusMessage": "Success",
        "Payload": {"importances": importances.tolist()},
    }
    return response


@router.get("/var_importances/{feature}", response_model=OutputwithPayloadDataModel)
def get_var_importances(feature, user_id: str = "0") -> Any:
    """
    Retrieve the importances of the features.
    """
    _, FEATURES = fetch_user_details(user_id)
    X_train, y_train = load_training_data(selected_features=FEATURES)
    X_test, _ = load_testing_data(selected_features=FEATURES)
    model = train_model(X_train, y_train)

    importances = get_variable_importance(model.predict_proba, X_train, X_test, feature)
    response = {
        "StatusCode": 1,
        "StatusMessage": "Success",
        "Payload": {
            "importances": importances,
        },
    }
    return response


@router.get("/recurrence/{feature}", response_model=OutputwithPayloadDataModel)
def get_recurrence(feature) -> Any:
    """
    Check the recurrence of a specific feature.
    """

    recurrence_rate = get_recurrence_rate(feature)
    response = {
        "StatusCode": 1,
        "StatusMessage": "Success",
        "Payload": {
            "recurrence_rates": recurrence_rate,
        },
    }
    return response


@router.post("/change_features", response_model=OutputwithPayloadDataModel)
def change_features(features: dict, user_id: str = "0") -> Any:
    """
    Get the features that need to be used when training the model
    """
    FEATURES = features

    update_user_details(user_id, FEATURES)

    print(FEATURES)
    response = {
        "StatusCode": 1,
        "StatusMessage": "Success",
        "Payload": {
            "Message": "Changed the given features.",
            "features": FEATURES,
        },
    }
    return response
