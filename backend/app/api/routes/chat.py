from typing import Any

from fastapi import APIRouter, HTTPException

from app.models import OutputwithPayloadDataModel
from app.api.routes.utils import (
    answer_question,
)
from app.core.db import fetch_user_details, update_user_details

router = APIRouter()

CHAT_HISTORY = {}


@router.post("/")
def get_user_input(input: dict) -> Any:
    """
    Retrieve users.
    """
    print(input)
    user = input["messages"][1]["user"]
    input["messages"][0]["text"] = input["messages"][0]["text"] + "in the dataset"
    if user not in CHAT_HISTORY:
        CHAT_HISTORY[user] = [input["messages"][0]["text"]]
    else:
        CHAT_HISTORY[user].append(input["messages"][0]["text"])

    # try:
    #     response = answer_question(input, chat_history=CHAT_HISTORY[user])
    # except:
    #     response = {"output": "Something went wrong. Please try again."}
    print(CHAT_HISTORY[user])
    response = answer_question(input, chat_history=CHAT_HISTORY[user])
    print(response)
    return {"text": response["output"]}
