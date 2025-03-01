# app/main.py
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.rag import AgriKnowledgeBase
from core.model import AgriChatbot
import pyttsx3  # Import pyttsx3 for text-to-speech

app = FastAPI()

# CORS configuration to allow requests from any origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize components
rag = AgriKnowledgeBase()
chatbot = AgriChatbot()
 # Initialize the TTS engine

@app.post("/query")
async def handle_query(query: str):
    """Handles text-based queries."""
    context_docs = rag.retrieve_context(query)
    context = "\n".join([doc.page_content for doc in context_docs])
    response = chatbot.generate_response(query, context)
    return {"response": response}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8800, reload=True)