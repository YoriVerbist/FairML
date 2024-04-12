from typing import Any

from fastapi import APIRouter, HTTPException

from app.models import OutputwithPayloadDataModel
from app.api.routes.utils import (
    load_training_data,
    load_testing_data,
    train_model,
    evaluate_model,
    get_feature_importances,
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
    X_test, y_test = load_testing_data()
    model = train_model(X_train, y_train)
    importances = get_feature_importances(
        model.predict_proba,
        model.named_steps["preprocessor"].transform(X_train),
        model.named_steps["preprocessor"].transform(X_test),
    )
    response = {
        "StatusCode": 1,
        "StatusMessage": "Success",
        "Payload": {"importances": importances},
    }
    return response
