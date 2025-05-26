from typing import Union
from typing import Dict
import pandas as pd
import joblib
from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
import re


import os
import pandas as pd
from dotenv import load_dotenv

import google.generativeai as genai
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from google.generativeai import GenerativeModel



app = FastAPI()

load_dotenv(override=True)
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
model = genai.GenerativeModel("gemini-1.5-flash")
for m in genai.list_models():
    print(m.name, "=>", m.supported_generation_methods)
embeddings = GoogleGenerativeAIEmbeddings(model = "models/embedding-001")
new_db = FAISS.load_local(r"C:\Users\aryam\Documents\ML\Ada_E_Comm\faiss_index", embeddings,allow_dangerous_deserialization=True)

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
    global new_db
    user_query = query.query
    products = new_db.similarity_search(user_query,k=50)
    # prompt = f"""
    # You are a product filtering assistant.

    # A user has searched for: "{user_query}"

    # Below is a list of products retrieved as similar to the user's query. Each product includes an ASIN and its properties in the format "property_name: property_value".

    # Your task is to:
    # 1. Carefully analyze the user's query.
    # 2. Read through the provided products.
    # 3. Return a list of ASINs for the products that best match the user's intent.

    # ⚠️ Rules:
    # - Only return ASINs that are truly relevant.
    # - If none of the products are relevant, return an **empty JSON list**.
    # - Your response must be a **valid JSON list of ASIN strings**.
    # - Do NOT include explanations or any additional text.

    # Products:
    # {products}

    # Example Output:
    # ["B09ABC1234", "B07XYZ5678"]
    # """

    prompt = f"""
    You are a product filtering assistant.

    A user has searched for: "{user_query}"

    Below is a list of products retrieved as similar to the user's query. Each product includes an ASIN and its properties in the format "property_name: property_value".

    Your task is to:
    1. Analyze the user's query and the provided products.
    2. Return:
    - A JSON list of ASINs for the products that best match the user's intent.
    - A short explanation (1-2 sentences) describing why these products were selected, based on the query and product properties.

    Respond in the following **strict** JSON format:
    {{
    "asins": ["ASIN1", "ASIN2", "..."],
    "explanation": "Short explanation here"
    }}

    Example:
    If the user_query is "rainy shoes", and among the products there are waterproof boots and slip-resistant sandals, then your response could be:
    {{
    "asins": ["B08XYZ123", "B09RAINY456"],
    "explanation": "These products are waterproof and slip-resistant, which makes them suitable for rainy conditions, matching your search for 'rainy shoes'."
    }}

    Rules:
    - Only include products that are clearly relevant.
    - If no relevant products are found, return an empty ASIN list with a suitable explanation.
    - Do NOT include anything outside of the JSON object.

    Here are the products:
    {products}

    """
    response = model.generate_content(prompt)
    
    raw_response = response.text.strip()

    cleaned = re.sub(r"^```(?:json)?\n|```$", "", raw_response).strip()
    try:
        result = json.loads(cleaned)
        print("result as result",result)
        asin_list = result.get("asins", [])
        explanation = result.get("explanation", "")
    except json.JSONDecodeError as e:
        asin_list = []
        explanation = "Could not parse explanation."
        print("Error as ",e)

    return {"asins": asin_list[:10] ,"explanation":explanation}
     

