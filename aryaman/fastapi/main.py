from typing import Union
from typing import Dict
import pandas as pd
import joblib
from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SearchRequest(BaseModel):
    query: str  

@app.post("/search")
async def read_input(query:SearchRequest):
    return {"asins":["B075GHP2LX","B0D9GW7S6Z"],"explanation":"sdfasdf"}
     
    