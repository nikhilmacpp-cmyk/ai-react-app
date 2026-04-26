from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.chat_models import ChatOllama

# 1. Your data
documents = [
    "Company allows 10 days leave per year",
    "Office timing is 9 AM to 5 PM",
    "Refund policy is 7 days",
    "JavaScript is a programming language used for web development"
];

embeddings = HuggingFaceEmbeddings()
db = FAISS.from_texts(documents,embeddings);
llm = ChatOllama(model = "llama3")

query = input("Ask Something :: ")
results = db.similarity_search_with_score(query, k=1)

docs, score = results[0]

print(score)  # debug

if score > 1.0:   # tune this threshold
    print("\query",query)
    prompt = query
else:
    prompt = docs.page_content
    
response = llm.invoke(prompt)
print("\nresponse",response)