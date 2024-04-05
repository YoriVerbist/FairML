from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from app.api.main import api_router
from app.core.config import settings
from app.initial_data import init


app = FastAPI(
    title=settings["PROJECT_NAME"],
)

# Set all CORS enabled origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add all the API routes
app.include_router(api_router)

# Initialize the database
init()

@app.get("/")
def get_root():
    return {"message": "Welcome to the API"}
