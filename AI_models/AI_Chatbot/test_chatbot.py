import speech_recognition as sr
import requests
import asyncio
import websockets

# Text-based query
def send_text_query(query):
    response = requests.post(
        "http://localhost:8800/query",
        json={"query": query}
    )
    return response.json()["response"]

# Voice-based query
async def send_voice_query():
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening...")
        audio = recognizer.listen(source)
        try:
            query = recognizer.recognize_google(audio)
            print("You said:", query)

            # Send query to WebSocket
            async with websockets.connect("ws://localhost:8800/voice-chat") as websocket:
                await websocket.send(query)
                response = await websocket.recv()
                print("Bot:", response)
        except sr.UnknownValueError:
            print("Sorry, I couldn't understand the audio.")
        except sr.RequestError:
            print("Could not request results from Google Speech Recognition service.")

# Test text and voice
if __name__ == "__main__":
    # Test text-based query
    text_response = send_text_query("How to prevent rice blast disease?")
    print("Text Response:", text_response)

    # Test voice-based query
    asyncio.get_event_loop().run_until_complete(send_voice_query())