from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import speech_recognition as sr
import pyttsx3
from core.rag import AgriRAG
from core.model import AgriModel, PromptBuilder

app = FastAPI()

# CORS configuration to allow requests from any origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize components
rag = AgriRAG()
model = AgriModel()
engine = pyttsx3.init()

@app.post("/query")
async def handle_query(query: str):
    """Handles text-based queries."""
    context_docs = rag.retrieve_context(query)
    context = "\n".join([doc.page_content for doc in context_docs])
    messages = PromptBuilder.build_agronomy_prompt(query, context)
    response = model.generate_response(messages)
    return {"response": response}

@app.websocket("/voice-chat")
async def websocket_voice(websocket: WebSocket):
    """Handles real-time voice chat using WebSockets."""
    await websocket.accept()
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        while True:
            try:
                await websocket.send_text("Listening...")
                audio = recognizer.listen(source)
                query = recognizer.recognize_google(audio)
                await websocket.send_text(f"User: {query}")

                # Process the query
                context_docs = rag.retrieve_context(query)
                context = "\n".join([doc.page_content for doc in context_docs])
                messages = PromptBuilder.build_agronomy_prompt(query, context)
                response = model.generate_response(messages)

                # Speak the response in real-time
                engine.say(response)
                engine.runAndWait()

                await websocket.send_text(f"Bot: {response}")
            except Exception as e:
                await websocket.send_text(f"Error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8800, reload=True)
