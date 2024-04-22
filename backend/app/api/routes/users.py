from typing import Any

from fastapi import APIRouter
from app.core.db import fetch_user_details, update_user_details, create_user

from app.models import OutputDataModel


router = APIRouter()


@router.get("/")
def read_users() -> Any:
    """
    Retrieve users.
    """
    print("Hello users")
    return {"message": "Hello users"}


@router.post("/", response_model=OutputDataModel)
def create_user_db(user: dict) -> Any:
    """
    Create a new user.
    """
    print(user)
    _, succes = create_user(user)
    response = {
        "StatusCode": succes,
        "StatusMessage": "Success",
    }
    return response
