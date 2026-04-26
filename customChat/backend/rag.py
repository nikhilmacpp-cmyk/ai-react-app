from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.chat_models import ChatOllama

# 1. Your data
documents = [
    "Company allows 10 days leave per year",
    "Office timing is 9 AM to 5 PM",
    "Refund policy is 7 days"
]