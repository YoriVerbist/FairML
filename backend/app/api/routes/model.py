from typing import Any

from fastapi import APIRouter, HTTPException
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
import pandas as pd
import numpy as np

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

router = APIRouter()


@router.get("/", response_model=OutputwithPayloadDataModel)
def get_model() -> Any:
    """
    Retrieve all the data from the model.
    """
    X_train, y_train = load_training_data()
    x_test, y_test = load_testing_data()
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
def predict_single_datapoint(id: int) -> Any:
    """
    Retrieve all the data from the model.
    """
    X_train, y_train = load_training_data(id)
    X_test, y_test = load_testing_data(id)
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
def get_importances() -> Any:
    """
    Retrieve the importances of the features.
    """
    X_train, y_train = load_training_data()
    X_test, _ = load_testing_data()
    model = train_model(X_train, y_train)

    importances = get_feature_importances(model.predict_proba, X_train, X_test)
    response = {
        "StatusCode": 1,
        "StatusMessage": "Success",
        "Payload": {"importances": importances.tolist()},
    }
    return response


@router.get("/importances/{id}", response_model=OutputwithPayloadDataModel)
def get_importances_id(id: int) -> Any:
    """
    Retrieve the importances of the features.
    """
    X_train, y_train = load_training_data()
    X_test, _ = load_testing_data()
    model = train_model(X_train, y_train)

    importances = get_feature_importances(model.predict_proba, X_train, X_test, id)
    response = {
        "StatusCode": 1,
        "StatusMessage": "Success",
        "Payload": {"importances": importances.tolist()},
    }
    return response


@router.get("/var_importances/{feature}", response_model=OutputwithPayloadDataModel)
def get_var_importances(feature) -> Any:
    """
    Retrieve the importances of the features.
    """
    X_train, y_train = load_training_data()
    X_test, _ = load_testing_data()
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
            "importances": recurrence_rate,
        },
    }
    return response
