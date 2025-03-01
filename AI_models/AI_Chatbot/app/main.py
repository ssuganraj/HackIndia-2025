# app/main.py
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from core.rag import AgriKnowledgeBase
from core.model import AgriChatbot
import pyttsx3  #text-to-speech

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
engine = pyttsx3.init()  # Initialize the TTS engine

@app.post("/query")
async def handle_query(query: str):
    """Handles text-based queries."""
    context_docs = rag.retrieve_context(query)
    print(query)
    context = "\n".join([doc.page_content for doc in context_docs])
    response = chatbot.generate_response(query, context)
    return {"response": response}

@app.websocket("/voice-chat")
async def websocket_voice(websocket: WebSocket):
    """Handles real-time voice chat using WebSockets."""
    await websocket.accept()
    
    try:
        while True:
            # Receive the query from the client
            query = await websocket.receive_text()
            print(f"Received query: {query}")

            # Process the query
            context_docs = rag.retrieve_context(query)
            context = "\n".join([doc.page_content for doc in context_docs])
            response = chatbot.generate_response(query, context)

            # Send the response back to the client
            await websocket.send_text(response)

            # Speak the response using TTS
            engine.say(response)  # Add the response to the TTS queue
            engine.runAndWait()   # Speak the response

    except Exception as e:
        print(f"Error in WebSocket handler: {e}")
        await websocket.send_text(f"Error: {str(e)}")
    finally:
        await websocket.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8800, reload=True)