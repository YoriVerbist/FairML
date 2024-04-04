from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import col, delete, func, select

from app import crud
from app.core.config import settings
from app.core.security import get_password_hash, verify_password
from app.models import ValidateUserModel


router = APIRouter()


@router.get(
    "/",
)
def read_users() -> Any:
    """
    Retrieve users.
    """
    pass
