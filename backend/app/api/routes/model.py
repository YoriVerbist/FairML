from typing import Any

from fastapi import APIRouter, HTTPException

from app.models import OutputwithPayloadDataModel
from app.api.routes.utils import train_model_service

router = APIRouter()


@router.get("/", response_model=OutputwithPayloadDataModel)
def get_model() -> Any:
    """
    Retrieve all the data from the model.
    """
    _, data = get_training_data()
    response = {"StatusCode": 1, "StatusMessage": "Success", "Payload": {"data": data}}
    return response
