from typing import Any

from fastapi import APIRouter, HTTPException

from app.models import OutputwithPayloadDataModel
from app.core.db import get_model_data, get_model_data_by_id

router = APIRouter()


@router.get("/", response_model=OutputwithPayloadDataModel)
def get_items() -> Any:
    """
    Retrieve items.
    """
    _, data = get_model_data()
    print("Data", data)
    response = {"StatusCode": 1, "StatusMessage": "Success", "Payload": {"data": data}}
    return response


@router.get("/{id}", response_model=OutputwithPayloadDataModel)
def get_item(id) -> Any:
    """
    Get item by ID.
    """
    _, statuscode, data = get_model_data_by_id(id)

    response = {
        "StatusCode": statuscode,
        "StatusMessage": "Success",
        "Payload": {"data": data},
    }
    return response
