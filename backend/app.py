import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import google.generativeai as genai
from dotenv import load_dotenv

# --- Gemini API Configuration ---
try:
    load_dotenv()
    genai.configure(api_key=os.environ["GEMINI_API_KEY"])
except KeyError:
    # This error block will run if the API key is not set.
    raise RuntimeError("GEMINI_API_KEY environment variable not set.") from None


app = FastAPI()

# --- CORS Middleware ---
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- Pydantic Model for Request Body
class ChatRequest(BaseModel):
    message: str


# --- AI Model Initialization ---
system_instruction = "You are a friendly and helpful chatbot assistant. Be concise and answer the user's questions."
model = genai.GenerativeModel(
    model_name="gemini-2.0-flash", system_instruction=system_instruction
)


# --- API Endpoint ---
@app.post("/api/chat")
async def chat_agent(request: ChatRequest):
    """
    This endpoint receives a message, sends it to the Gemini API,
    and returns the AI's response.
    """
    user_message = request.message
    if not user_message:
        raise HTTPException(status_code=400, detail="Message cannot be empty.")

    print(f"Sending to Gemini: {user_message}")

    try:
        # --- Call the Gemini API --- This is where the AI "thinks".
        response = model.generate_content(user_message)

        # Extract the text from the AI's response
        bot_response = response.text
        print(f"Received from Gemini: {bot_response}")

        # Return the bot's response in a JSON format
        return {"response": bot_response}

    except Exception as e:
        # --- Error Handling ---
        print(f"An error occurred: {e}")
        raise HTTPException(
            status_code=500, detail="Failed to get a response from the AI agent."
        )


# --- Root Endpoint (for testing if the server is running) ---
@app.get("/")
def read_root():
    return {"message": "FastAPI Chatbot Agent with Gemini is running!"}


# This block allows you to run the app directly with `python main.py`
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
