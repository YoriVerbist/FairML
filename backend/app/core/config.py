import secrets
from typing import Literal

from dotenv import dotenv_values

class Settings():
    

    # Project Details
    PROJECT_NAME: str = "FariML"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = secrets.token_urlsafe(32)
    # 60 minutes * 24 hours * 8 days = 8 days
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8
    DOMAIN: str = "localhost"
    ENVIRONMENT: Literal["local", "staging", "production"] = "local"
    
    # Database
    DBNAME: str
    CONNECTION_STRING:str
    USER_COLLECTION: str
    INTERACTIONS_COLLECTION: str
    ACCURACY_COLLECTION: str
    MODEL_CONFIG: str

    # Information about the features
    ALL_FEATURES: list = [
        "Age",
        "Gender",
        "Smoking",
        "Hx Smoking",
        "Hx Radiothreapy",
        "Thyroid Function",
        "Physical Examination",
        "Adenopathy",
        "Pathology",
        "Focality",
        "Risk",
        "T",
        "N",
        "M",
        "Stage",
        "Response",
        "Recurred",
    ]
    DEFAULT_VALUES: list = [()]

    BACKEND_CORS_ORIGINS: list = []


    # User Detail Template
    USER_DETAIL_JSON: dict | None = {
        "UserName": None,
        "Cohort": None,
        "Gender": "Male"
    }

env_values = dotenv_values("../.env")
settings = Settings(**env_values)  # type: ignore
