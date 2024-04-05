from pydantic import BaseModel
from typing import Optional, List, Union
from app.core.config import settings


class OutputDataModel(BaseModel):
    StatusCode: bool
    StatusMessage: str


class OutputwithPayloadDataModel(BaseModel):
    StatusCode: bool
    StatusMessage: str
    OutputJson: dict = None


class ConfigDataModel(BaseModel):
    UserId: str
    Cohort: str
    JsonData: dict = None


class ValidateUserModel(BaseModel):
    UserId: str
    Cohort: str
    Language: str = "ENG"


class FeaturesToInclude(BaseModel):
    features_to_include: list[str] = settings["ALL_FEATURES"]


class FeatureRanges(BaseModel):
    features_to_include: list[str] = settings["ALL_FEATURES"]
    features_ranges: list[tuple] = settings["DEFAULT_VALUES"]
