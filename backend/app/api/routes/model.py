from typing import Any

from fastapi import APIRouter, HTTPException

from app.models import OutputwithPayloadDataModel
from app.api.routes.utils import (
    load_training_data,
    load_testing_data,
    train_model,
    evaluate_model,
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
