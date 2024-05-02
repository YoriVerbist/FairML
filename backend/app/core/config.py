import secrets

from dotenv import dotenv_values


config = {
    "MODEL_DATA": "model_data",
    "MODEL_DATA_PATH": "../data/Thyroid_Diff.csv",
    "USER_COLLECTION": "user_data",
    "DBNAME": "FairML-backend",
    "PROJECT_NAME": "FariML",
    "SECRET_KEY": secrets.token_urlsafe(32),
    "ACCESS_TOKEN_EXPIRE_MINUTES": 60 * 24 * 8,
    # Information about the features
    "ALL_FEATURES": [
        "Age",
        "Gender",
        "Smoking",
        "History Smoking",
        "Hisotry Radiotherapy",
        "Thyroid Function",
        "Physical Examination",
        "Adenopathy",
        "Pathology",
        "Focality",
        "Risk",
        "Size Of Original Tumor",
        "Nearby Lymph Nodes",
        "Distant Metastasis",
        "Stage",
        "Response",
        "Recurred",
    ],
    "DEFAULT_VALUES": [()],
    # User Detail Template
    "USER_DETAIL_JSON": {"UserName": None, "Cohort": None, "Gender": "Male"},
}

env_values = dotenv_values(".env")
settings = {**config, **env_values}
