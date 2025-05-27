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
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

load_dotenv(override=True)
dict_keys = eval(os.getenv("GOOGLE_API_KEYS"))
embeddings = GoogleGenerativeAIEmbeddings(model = "models/embedding-001")
new_db = FAISS.load_local(r"C:\Users\aryam\Documents\ML\Ada_E_Comm\faiss_index", embeddings,allow_dangerous_deserialization=True)
prompts_paths = {'searching':r"C:\Users\aryam\Documents\ML\Ada_E_Comm\Ada\aryaman\fastapi\prompt_searching.txt",
                     'recommendations':r"C:\Users\aryam\Documents\ML\Ada_E_Comm\Ada\aryaman\fastapi\prompt_recommendations.txt"}

model = None
requests_count = 0

def load_prompts():
    prompts = {}
    for key,value in prompts_paths.items():
        try:
            with open(value,"r") as f:
                prompts[key] = f.read()
        except Exception as e:
            print("Err : in load_prompts ",e)
    return prompts

def change_key_and_load_model():
    global requests_count,model
    requests_count %= 15
    index = requests_count // 3
    match (requests_count%3):
        case 0:
            key = dict_keys['Aryaman'][index]
        case 1:
            key = dict_keys['Ayushmaan'][index]
        case 2:
            key = dict_keys['Devansh'][index]
    try:
        genai.configure(api_key=key)
        if not model:
            model = genai.GenerativeModel("gemini-1.5-flash")
    except Exception as e:
        print("Err: in changing key and model loading ",e)
    requests_count +=1 

def list_models():
    if model:
        for m in genai.list_models(): 
            print(m.name, "=>", m.supported_generation_methods)
    else:
        raise Exception("model not found")

def askLLM(prompt):
    change_key_and_load_model()
    try:
        return model.generate_content(prompt)
    except Exception as e:
        print("Err: in generating content ",e)



prompts = load_prompts()
class SearchRequest(BaseModel):
    query: str  
class RecommendationRequest(BaseModel):
    user_id: str

@app.post("/search")
async def read_input(query:SearchRequest):
    global new_db
    user_query = query.query
    products = new_db.similarity_search(user_query,k=50)
    response = askLLM(prompts['searching'].format(user_query=user_query,products=products))
    raw_response = response.text.strip()

    # region What this Regex Do?
    # cleans output of LLM like :
    #   ```json
    #   {
    #       "name":"Alice",
    #       "age":22
    #   }
    #   ```
    # into :

    #   {
    #       "name":"Alice",
    #       "age":22
    #   }
    # endregion
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
     

@app.post("/start_recommendation")
async def process_recommendations(userid:RecommendationRequest):
    print(userid)
    print("hello there")
    useridx = userid.user_id
    prod1 =  {
  "Main Category": "Baby Products",
  "Tag": "Diapers",
  "ASIN": "B075GHP2LX",
  "Product Link": "https://www.amazon.in/dp/B075GHP2LX",
  "Images": [
    "https://m.media-amazon.com/images/I/61nwnjBv1pL._SY450_.jpg"
  ],
  "title": "Huggies Complete Comfort Wonder Pants | Pant Style Baby Diapers L Size, 128 Count | India's Fastest Absorbing Diaper, Patented Dry Xpert Channel, Ideal for 9 to 14 Kgs",
  "productOverview": {
    "Brand": "Huggies",
    "Number of Items": "1",
    "Colour": "White",
    "Incontinence Protector Type": "Infant Diaper",
    "Age Range (Description)": "Infant",
    "Material": "Cotton",
    "Material Type Free": "Chlorine Free",
    "Reusability": "Disposable",
    "Size": "Large",
    "Net Quantity": "128 count"
  },
  "featureBullets": [
    " New & Improved Huggies Complete Comfort Wonder Pants - India's Fastest Absorbing diaper with Patented Dry Xpert Channel; Large size / L Size baby diapers  ",
    " Our L size diapers are designed for babies in 9 to 14 Kgs weight range; Find the best fit for your baby from our range of sizes (New born, S, M, L, XL, XXL, XXXL sizes)  ",
    " Enjoy a peaceful night's sleep with Up to 12 Hours Overnight Absorption; Our best ever diaper pants ensure superior dry feel with Up to 4X Faster urine absorption  ",
    " Stay worry free with Huggies equipped with double leak guard to help prevent Thigh Leakage ; Our diapers are made from breathable material which helps baby's skin to breathe  ",
    " Our baby diaper pants feature India's 1st ever Bubble Bed technology that provides a soft inner side bubble layer to wrap your baby in ultimate softness  "
  ],
  "stars": 4.2,
  "ratings": 203745,
  "listPrice": 2799,
  "salePrice": 1466,
  "bookDescription": None
}
    return [prod1]