from typing import Any

from fastapi import APIRouter, HTTPException

from app.models import OutputwithPayloadDataModel
from app.api.routes.utils import (
    answer_question,
)
from app.core.db import fetch_user_details, update_user_details

router = APIRouter()


@router.post("/")
def get_user_input(input: dict) -> Any:
    """
    Retrieve users.
    """
    try:
        response = answer_question(input)
    except:
        response = {"output": "Something went wrong. Please try again."}
    print(response)
    return {"text": response["output"]}
