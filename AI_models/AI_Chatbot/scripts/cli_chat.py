# scripts/cli_chat.py
import sys
import os
from pathlib import Path

# Add the project root to Python path
PROJECT_ROOT = Path(__file__).parent.parent.absolute()
sys.path.append(str(PROJECT_ROOT))

from core.rag import AgriKnowledgeBase
from core.model import AgriChatbot


def main():
    # Initialize components
    rag = AgriKnowledgeBase()
    chatbot = AgriChatbot()
    
    print("🌱 AgriExpert Chatbot (Standalone Mode)")
    while True:
        query = input("\nYou: ")
        if query.lower() in ["exit", "quit"]:
            break
        
        # Retrieve context
        context_docs = rag.retrieve_context(query)
        context = "\n".join([doc.page_content for doc in context_docs])
        
        # Generate and print response
        response = chatbot.generate_response(query, context)
        print(f"\nBot: {response}")

if __name__ == "__main__":
    main()