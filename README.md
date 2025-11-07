
# 🛍️ Ada E-Comm: *Shop Smarter, Live Better!*

**Ada E-Comm** is an intelligent, LLM-powered e-commerce platform designed to make online shopping personal, intuitive, and delightful.
The system learns from each user’s behavior — their searches, preferences, and purchases — to provide highly personalized recommendations and smart product discovery.

---

## 🌟 Overview

In a typical e-commerce site, recommendations are often generic. Ada E-Comm changes that.
By combining **Large Language Models (LLMs)** with **Retrieval-Augmented Generation (RAG)**, the platform delivers context-aware suggestions that actually make sense for each individual shopper.

The website dynamically adapts to what the user searches for, views, or buys, and even the banner ads on the homepage reflect their unique interests.

---

## 💡 How It Works

When a user signs up, they share a few personal shopping preferences.
As they continue browsing, Ada E-Comm tracks their **search history**, **viewed items**, and **purchased products**.
This data forms the foundation for personalized home-page recommendations, featured banners, and related product suggestions.

For product discovery, the **semantic search** system is powered by a **Gemini LLM** combined with a **RAG pipeline**.
User queries are converted into embeddings and compared against product vectors (stored in **FAISS**), ensuring the most semantically relevant items are returned — even if the wording differs from product titles.

---

## 🧠 Technical Architecture

* **Frontend:** React (clean, dynamic UI)
* **Backend:** FastAPI
* **Database:** MongoDB for user and product data
* **Vector Database:** FAISS for similarity search
* **LLM:** Google’s Gemini integrated with RAG for contextual responses
* **Scraping:** Over 6,000 products extracted from Amazon using Selenium — including titles, prices, discounts, ratings, images, and features.
* **Authentication:** Secure login/signup system connected to MongoDB.

---



## 🖼️ Glimpses


### 🏠 Home Page
<img width="1322" height="617" alt="Screenshot 2025-04-28 010314" src="https://github.com/user-attachments/assets/6dc5e418-278f-4a29-b66d-bc916b1da630" />



### 🔍 Semantic Search
<img width="1356" height="618" alt="Screenshot 2025-05-27 215201" src="https://github.com/user-attachments/assets/8474184f-8c87-4875-aab0-c1a3d6936f01" />


### 🛒 Personalized Recommendations
<img width="716" height="402" alt="Screenshot 2025-04-28 010911" src="https://github.com/user-attachments/assets/507fbbab-e3d3-4ad3-b78b-9db1a331ab15" />


### 🔐 Advertisements
<img width="1311" height="188" alt="Screenshot 2025-04-28 011414" src="https://github.com/user-attachments/assets/135448f3-40bc-430c-95c7-b2f15d0b6ba8" />
<img width="1305" height="187" alt="Screenshot 2025-04-28 011039" src="https://github.com/user-attachments/assets/ba7e9a46-880b-4a2c-bb57-de0ac2cc6e21" />





---


## 🤝 Team & Acknowledgements

Developed by **Aryaman , Ayushmaan * Devansh**


