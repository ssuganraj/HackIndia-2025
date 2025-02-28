from groq import Groq
from config.settings import settings
from typing import List, Dict

class AgriChatbot:
    def __init__(self):
        self.client = Groq(api_key=settings.GROQ_API_KEY)
        self.model = settings.LLM_MODEL
        self.system_prompt = """
        You are an expert agronomist specializing in crop management, plant pathology, 
        and sustainable farming practices. Follow these strict rules:

        1. Only answer questions related to agriculture, including:
           - Crop cultivation & rotation
           - Pest/disease diagnosis & treatment
           - Soil management & fertilization
           - Irrigation & farming techniques
        2. For non-agricultural questions, respond: 
           "I specialize in agricultural advice. Please ask about crops, soil, or farming practices."
        3. Always use bullet points (2-4 max) with concise, actionable advice
        4. Cite sources like FAO/USDA when possible
        5. If uncertain, recommend consulting local agricultural extension services
        """
        self.agriculture_keywords = [
            "crop", "soil", "pest", "fertilizer", "irrigation", "harvest", 
            "plant", "disease", "fungal", "tomato", "wheat", "maize", "rice",
            "agriculture", "farming", "farmer", "crop rotation", "pesticide",
            "weed", "yield", "compost", "manure", "sustainable", "organic"
        ]

    def is_agriculture_query(self, query: str) -> bool:
        """Check if the query is related to agriculture"""
        query = query.lower()
        return any(keyword in query for keyword in self.agriculture_keywords)

    def generate_response(self, query: str, context: str) -> str:
        """Generate agriculture-specific answer using Groq + context"""
        if not self.is_agriculture_query(query):
            return "I specialize in agricultural advice. Please ask about crops, soil, or farming practices."

        response = self.client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": self.system_prompt
                },
                {
                    "role": "user",
                    "content": f"""Context from agricultural manuals:
                    {context}
                    
                    Question: {query}
                    
                    Answer in this format:
                    - [Bullet 1]
                    - [Bullet 2]
                    - [Optional source citation]"""
                }
            ],
            model=self.model,
            temperature=0.2,  # More deterministic output
            max_tokens=250,
            top_p=0.9
        )
        return response.choices[0].message.content