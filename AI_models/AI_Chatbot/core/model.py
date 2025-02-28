from groq import Groq
from config.settings import settings
from typing import List, Dict
import logging
import requests

logging.basicConfig(filename='chatbot.log', level=logging.ERROR)

class AgriChatbot:
    def __init__(self):
        self.client = Groq(api_key=settings.GROQ_API_KEY)
        self.model = settings.LLM_MODEL
        self.weather_api_key = "api here"  # Replace with your API key
        self.system_prompt = """
        You are an expert agronomist specializing in crop management, plant pathology, 
        and sustainable farming practices. Follow these strict rules:

        1. **Provide accurate, reliable, and actionable advice** based on scientific research and trusted sources.

        2. **Only answer questions related to agriculture**, including:
           - Crop cultivation, types of crops, and their characteristics
           - Soil management, fertilization, and irrigation
           - Pest and disease diagnosis, prevention, and treatment
           - Farming techniques, tools, and best practices
           - Seasonal crop recommendations and planting schedules
           - Weather-based crop and farming advice

        3. **For non-agricultural questions, respond with this exact message:**
           "I specialize in agricultural advice. Please ask about crops, soil, or farming practices."

        4. **Always use bullet points (2-4 max) with concise, actionable advice.**

        5. **Cite reliable sources like FAO, USDA, or local agricultural extension services** when possible.

        6. **If uncertain, recommend consulting local agricultural experts or extension services.**

        7. **Do not make speculative or unverified claims.** Always prioritize accuracy and reliability.
        """
        self.agriculture_keywords = [
            "cultivate", "grow", "plant", "harvest", "farm", "crop", "soil", "pest", 
            "fertilizer", "irrigation", "season", "agriculture", "farming", "farmer", 
            "crop rotation", "pesticide", "weed", "yield", "compost", "manure", 
            "sustainable", "organic", "sugarcane", "cotton", "coffee", "tea", 
            "banana", "potato", "vegetable", "fruit", "orchard", "greenhouse", 
            "tillage", "mulch", "seed", "sapling", "grafting", "pruning", 
            "harvesting", "storage", "livestock", "poultry", "aquaculture", 
            "agroforestry", "hydroponics", "biopesticide", "herbicide", 
            "fungicide", "insecticide", "drip irrigation", "sprinkler", 
            "tractor", "plough", "harvester", "cultivation", "plantation"
        ]

    def is_agriculture_query(self, query: str) -> bool:
        """Check if the query is related to agriculture."""
        query = query.lower()
        # Check if any agriculture keyword is in the query
        return any(keyword in query for keyword in self.agriculture_keywords)

    def validate_response(self, response: str) -> bool:
        """Validate the response format."""
        return (
            response.strip() and  # Not empty
            "- " in response      # Contains bullet points
        )

    def get_weather_data(self, location: str) -> dict:
        """Fetch current weather data for a given location."""
        try:
            url = f"http://api.openweathermap.org/data/2.5/weather?q={location}&appid={self.weather_api_key}&units=metric"
            response = requests.get(url)
            response.raise_for_status()
            return response.json()
        except Exception as e:
            logging.error(f"Error fetching weather data: {e}")
            return None

    def extract_location(self, query: str) -> str:
        """Extract location from the query (basic implementation)."""
        # Example: Extract "Punjab" from "What can I cultivate in Punjab?"
        if "punjab" in query.lower():
            return "Punjab,IN"
        # Add more location extraction logic as needed
        return None

    def generate_response(self, query: str, context: str) -> str:
        """Generate agriculture-specific answer using Groq + context."""
        if not self.is_agriculture_query(query):
            return "I specialize in agricultural advice. Please ask about crops, soil, or farming practices."

        # Check if the query is related to weather
        if "weather" in query.lower() or "season" in query.lower():
            location = self.extract_location(query)  # Extract location from query
            if location:
                weather_data = self.get_weather_data(location)
                if weather_data:
                    weather_context = (
                        f"Current weather in {location}: "
                        f"Temperature: {weather_data['main']['temp']}°C, "
                        f"Humidity: {weather_data['main']['humidity']}%, "
                        f"Weather: {weather_data['weather'][0]['description']}."
                    )
                    context += f"\n\n{weather_context}"

        # Build the user prompt dynamically
        user_prompt = f"""Context from agricultural manuals:
        {context}
        
        Question: {query}
        
        Answer in this format:
        - [Bullet 1]
        - [Bullet 2]
        - [Optional source citation]"""

        try:
            # Generate response
            response = self.client.chat.completions.create(
                messages=[
                    {
                        "role": "system",
                        "content": self.system_prompt
                    },
                    {
                        "role": "user",
                        "content": user_prompt
                    }
                ],
                model=self.model,
                temperature=0.2,  # More deterministic output
                max_tokens=250,
                top_p=0.9
            )
            response = response.choices[0].message.content

            # Validate the response
            if not self.validate_response(response):
                return "Sorry, I couldn't generate a valid response. Please try again."

            return response

        except Exception as e:
            # Handle API errors gracefully
            logging.error(f"Error generating response: {e}")
            return "Sorry, I'm unable to generate a response right now. Please try again later."