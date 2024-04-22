from fastapi import APIRouter

from app.api.routes import data, users, model

api_router = APIRouter()
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(data.router, prefix="/data", tags=["data"])
api_router.include_router(model.router, prefix="/model", tags=["model"])
