from typing import Any

from fastapi import APIRouter, HTTPException

from app.api.deps import CurrentUser, SessionDep
from app.models import OutputDataModel, OutputwithPayloadDataModel

router = APIRouter()


@router.get("/", response_model=OutputwithPayloadDataModel)
def read_items(
    session: SessionDep, current_user: CurrentUser, skip: int = 0, limit: int = 100
) -> Any:
    """
    Retrieve items.
    """
    pass


@router.get("/{id}", response_model=OutputwithPayloadDataModel)
def read_item(session: SessionDep, current_user: CurrentUser, id: int) -> Any:
    """
    Get item by ID.
    """
    pass
