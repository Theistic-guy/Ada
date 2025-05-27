from typing import Union
from typing import Dict
import pandas as pd
import joblib
from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
import pickle
import re
import os
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = r"C:\Users\aryam\Documents\ML\Ada_E_Comm\ada-gemini-eb2cbf0bb343.json"

import pandas as pd
from dotenv import load_dotenv
import google.generativeai as genai
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from google.generativeai import GenerativeModel
import asyncio
from pymongo import MongoClient
from bson import ObjectId

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

with open(r"C:\Users\aryam\Documents\ML\Ada_E_Comm\Ada\aryaman\fastapi\static_recommendations.pkl","rb") as f:
    static_recommendations = pickle.load(f)

try:
    client = MongoClient("mongodb://localhost:27017/")


    db = client["products"]


    products_collection = db["ada"]
    users_collection = db['users']
except Exception as e:
    print("Err: in connecting to mongodb ",e)


loggedin_user = None
users_recommendations_dict = {}

background_task = None
stop_signal = False


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

def generate_recommendations(userid):
    user = users_collection.find_one({"_id": ObjectId(userid)})
    texts = []
    texts.append("\n".join(user['interests']))
    set_searches = set()
    for x in user['searches']:
        set_searches.add(x)

    texts.append("\n".join(set_searches))
    sub_cats = []
    for obj in user['cart']:
        sub_cats.append(products_collection.find({"ASIN":obj['ASIN']})[0]['Tag'])

    texts.append("\n".join(sub_cats))
    text_search = "\n".join(texts)
    products_to_recommend = new_db.similarity_search(text_search,k=50)
    productsx = []
    for i,doc in enumerate(products_to_recommend):
        productsx.append(doc.page_content)
    joined_prods = "\n\n".join(productsx)
    change_key_and_load_model()
    response = askLLM(prompts['recommendations'].format(text_search=text_search,joined_prods=joined_prods))
    asins_list = response.text.strip().splitlines()
    recommended_docs = list(products_collection.find({"ASIN": {"$in": asins_list}}, {"_id": 0}))
    return (asins_list,recommended_docs)



# only runs if the current logged in user is same as the userid this function is configured to run for
async def update_recommendations_daemon(userid_under_process):
    global users_recommendations_dict
    user_under_process = userid_under_process
    user_now = users_collection.find_one({"_id": ObjectId(user_under_process)})
    user_name = user_now['FullName']
    print("✅ update_recommendations_daemon started. for ",user_name)
    while not stop_signal and (user_under_process == loggedin_user):
        print("🔁 Doing something... for ",user_name)
        user = users_collection.find_one({"_id": ObjectId(user_under_process)})
        is_modified = user['changes']
        if is_modified :
            output = generate_recommendations(user_under_process)
            print("generated recommendations",output[1])
            users_collection.update_one(
                {"_id": ObjectId(user_under_process)},
                {"$set": {"recommendation": output[1]}}
            )
            print('updated in the db')
            users_recommendations_dict[user_under_process] = output[1]
            users_collection.update_one(
                {"_id": ObjectId(user_under_process)},
                {"$set": {"changes": False}}
            )
        elif (not is_modified and user_under_process not in users_recommendations_dict):
            if not user['recommendation']: 
                users_recommendations_dict[user_under_process] = user['recommendation']
            # load the users_reocmms_dictinaroy with the recommendations already stored
            
        else:
            # do nothing i gues
            pass
        
        await asyncio.sleep(10)  
    print("🛑 update_recommendations_daemon stopped. for ",user_name)










prompts = load_prompts()
class SearchRequest(BaseModel):
    query: str  
class RecommendationRequest(BaseModel):
    user_id: str

@app.post("/search")
async def read_input(query:SearchRequest):
    try:
        global new_db
        user_query = query.query
        print("received query")
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
        result = json.loads(cleaned)
        print("result as result",result)
        asin_list = result.get("asins", [])
        explanation = result.get("explanation", "")
    except json.JSONDecodeError as e:
        asin_list = []
        explanation = "Could not parse explanation."
        print("Error as ",e)
    except Exception as e:
        print("Error: in generating search results ")
        asin_list = []
        explanation = "Could not parse explanation."

    

    return {"asins": asin_list[:10] ,"explanation":explanation}
     

@app.post("/start_recommendation")
async def process_recommendations(useridx:RecommendationRequest):
    userid = useridx.user_id
    global loggedin_user,background_task
    recommendations_to_return = None
    if userid in users_recommendations_dict:
        recommendations_to_return = users_recommendations_dict[userid]
    else:
        usery = users_collection.find_one({"_id": ObjectId(userid)})
        if usery['recommendation']:
            recommendations_to_return = usery['recommendation']
        else:
            recommendations_to_return = static_recommendations

    if loggedin_user == None or loggedin_user != userid:
        loggedin_user = userid
        background_task = asyncio.create_task(update_recommendations_daemon(userid))
    else:
        # i gues do nothing
        pass
    
    return recommendations_to_return
    