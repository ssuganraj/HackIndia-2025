from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
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

@app.post("/query")
async def handle_query(query: str):
    # Retrieve context from your RAG pipeline
    context_docs = rag.retrieve_context(query)
    context = "\n".join([doc.page_content for doc in context_docs])
    
    # Build the agronomy prompt using the retrieved context and user query
    messages = PromptBuilder.build_agronomy_prompt(query, context)
    
    # Generate response using your Groq/Mistral model logic
    response = model.generate_response(messages)
    return {"response": response}

# Run the FastAPI app on port 8800 when executed directly
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8800, reload=True)
