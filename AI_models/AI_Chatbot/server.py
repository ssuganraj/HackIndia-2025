# server.py
import asyncio
import websockets
from core.model import AgriChatbot
from core.rag import AgriKnowledgeBase
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("WebSocketServer")

# Initialize components
rag = AgriKnowledgeBase()
chatbot = AgriChatbot()

async def handle_voice_chat(websocket, path):
    """
    Handle incoming WebSocket connections and process voice queries.
    """
    logger.info("New connection established")
    async for message in websocket:
        logger.info(f"Received query: {message}")
        
        # Retrieve context from the knowledge base
        context_docs = rag.retrieve_context(message)
        context = "\n".join([doc.page_content for doc in context_docs])
        logger.info(f"Retrieved context: {context}")
        
        # Generate a response using the chatbot
        response = chatbot.generate_response(message, context)
        logger.info(f"Generated response: {response}")
        
        # Send the response back to the client
        await websocket.send(response)

async def main():
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

if __name__ == "__main__":
    asyncio.run(main())