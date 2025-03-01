import asyncio
import websockets
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from core.model import AgriChatbot
from core.rag import AgriKnowledgeBase
import logging
import uvicorn

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("WebSocketServer")

# Initialize components
rag = AgriKnowledgeBase()
chatbot = AgriChatbot()

# FastAPI app for REST API
app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (update for production)
    allow_methods=["*"],
    allow_headers=["*"],
)

# REST API endpoint for text queries
@app.post("/api/query")
async def handle_text_query(query: dict):
    """
    Handle text-based queries via REST API.
    """
    try:
        user_query = query.get("query")
        if not user_query:
            raise HTTPException(status_code=400, detail="Query is required")

        # Retrieve context and generate response
        context_docs = rag.retrieve_context(user_query)
        context = "\n".join([doc.page_content for doc in context_docs])
        response = chatbot.generate_response(user_query, context)

        return {"response": response}
    except Exception as e:
        logger.error(f"Error processing text query: {e}")
        raise HTTPException(status_code=500, detail="Failed to process query")

# WebSocket server for voice queries
async def handle_voice_chat(websocket, path):
    """
    Handle voice-based queries via WebSocket.
    """
    logger.info("New WebSocket connection established")
    async for message in websocket:
        logger.info(f"Received voice query: {message}")

        try:
            # Retrieve context and generate response
            context_docs = rag.retrieve_context(message)
            context = "\n".join([doc.page_content for doc in context_docs])
            response = chatbot.generate_response(message, context)

            # Send the response back to the client
            await websocket.send(response)
        except Exception as e:
            logger.error(f"Error processing voice query: {e}")
            await websocket.send("Failed to process voice query. Please try again.")

async def start_websocket_server():
    """
    Start the WebSocket server.
    """
    try:
        logger.info("Starting WebSocket server...")
        async with websockets.serve(handle_voice_chat, "localhost", 8801):
            logger.info("WebSocket server started on ws://localhost:8801")
            await asyncio.Future()  # Run forever
    except Exception as e:
        logger.error(f"Failed to start WebSocket server: {e}")

# Start both REST API and WebSocket servers
if __name__ == "__main__":
    # Start the FastAPI (REST API) server
    uvicorn.run(app, host="0.0.0.0", port=5000)

    # Start the WebSocket server in a separate thread
    asyncio.get_event_loop().run_until_complete(start_websocket_server())