# test_voice.py
import speech_recognition as sr
import asyncio
import websockets
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("VoiceClient")

async def send_voice_query():
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening...")
        audio = recognizer.listen(source)
        try:
            query = recognizer.recognize_google(audio)
            print("You said:", query)

            # Send query to WebSocket
            try:
                async with websockets.connect("ws://localhost:8800/voice-chat") as websocket:
                    logger.info("Connected to WebSocket server")
                    await websocket.send(query)
                    logger.info(f"Sent query: {query}")
                    response = await websocket.recv()
                    logger.info(f"Received response: {response}")
                    print("Bot:", response)
            except websockets.exceptions.ConnectionClosedError:
                logger.error("WebSocket connection closed unexpectedly.")
            except ConnectionRefusedError:
                logger.error("Could not connect to WebSocket server. Is the server running?")
            except Exception as e:
                logger.error(f"WebSocket error: {str(e)}")
        except sr.UnknownValueError:
            print("Sorry, I couldn't understand the audio.")
        except sr.RequestError:
            print("Could not request results from Google Speech Recognition service.")
        except Exception as e:
            print(f"Error: {str(e)}")

if __name__ == "__main__":
    asyncio.get_event_loop().run_until_complete(send_voice_query())