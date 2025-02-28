import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    GROQ_API_KEY = os.getenv("GROQ_API_KEY")
    EMBEDDING_MODEL = "all-MiniLM-L6-v2"  # Lightweight embeddings
    LLM_MODEL = "mixtral-8x7b-32768"      # Groq's fastest model
    DATA_SOURCES = [
    # FAO Guides (always reliable)
    "https://www.fao.org/3/y5146e/y5146e0b.htm",  # Crop Rotation
    "https://www.fao.org/3/y5031e/y5031e00.htm",  # Pest Management

    # CABI Plantwise (global plant health)
    "https://www.plantwise.org/knowledgebank/",

    # USDA (US-specific but reliable)
    "https://www.nal.usda.gov/legacy/afsic/sustainable-agriculture-definitions-and-terms"
]
settings = Settings()