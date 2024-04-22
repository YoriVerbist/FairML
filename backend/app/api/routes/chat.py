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
    input["messages"][0]["text"] = (
        input["messages"][0]["text"] + " using tool python_repl_ast"
    )
    print(input)
    response = answer_question(input)
    print(response)
    return {"text": response}
