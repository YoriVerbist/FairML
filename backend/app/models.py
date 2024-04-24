from pydantic import BaseModel
from typing import Optional, List, Union
from app.core.config import settings


class OutputDataModel(BaseModel):
    StatusCode: bool
    StatusMessage: str


class OutputwithPayloadDataModel(BaseModel):
    StatusCode: bool
    StatusMessage: str
    Payload: dict


class ConfigDataModel(BaseModel):
    UserId: str
    Cohort: str
    Payload: dict


class ValidateUserModel(BaseModel):
    UserId: str
    Cohort: str
    Language: str = "ENG"
