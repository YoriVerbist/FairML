from typing import Any

from fastapi import APIRouter, HTTPException

from app.models import OutputDataModel, OutputwithPayloadDataModel

router = APIRouter()


@router.get("/")
def read_items() -> Any:
    """
    Retrieve items.
    """
    return {"message": "Items"}


@router.get("/{id}", response_model=OutputwithPayloadDataModel)
def read_item() -> Any:
    """
    Get item by ID.
    """
    pass
