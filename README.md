# AI Chatbot

A simple, responsive AI chatbot application built with a Python/Flask backend and a Next.js/React frontend.

## Overview

This project provides a clean, modern web interface for interacting with an AI model. The backend handles the logic for communicating with the AI service, and the frontend provides the user interface for the chat.

## Features

- **Interactive Chat**: Real-time, conversational experience.
- **Modern UI**: Clean and responsive user interface built with Next.js and Tailwind CSS.
- **Python Backend**: A lightweight Flask server to process requests and connect to the AI.
- **Easy to Configure**: Uses environment variables for API key management.

## Tech Stack

- **Frontend**:
  - [Next.js](https://nextjs.org/)
  - [React](https://reactjs.org/)
  - [Tailwind CSS](https://tailwindcss.com/)
- **Backend**:
  - [Python](https://www.python.org/)
  - [Flask](https://flask.palletsprojects.com/)
  - [Google Gemini API](https://ai.google.dev/docs/gemini_api_overview)

## Getting Started

Follow these instructions to get a local copy up and running for development and testing purposes.

### Prerequisites

- Python 3.8+
- Node.js and npm (or yarn/pnpm)
- An [OpenAI API key](https://platform.openai.com/account/api-keys)

### Configuration

1. The backend requires an GEMINI API key to function.
2. In the `backend` directory, create a new file named `.env`.
3. Add your API key to the `.env` file like this:

    ```
    GEMINI_API_KEY = "Your Gemini API Key Here"
    ```

### Backend Setup

1. **Navigate to the backend directory:**

    ```sh
    cd backend
    ```

2. **Create and activate a virtual environment:**

    ```sh
    # For Windows
    python -m venv .venv
    .\.venv\Scripts\activate

    # For macOS/Linux
    # python3 -m venv .venv
    # source .venv/bin/activate
    ```

3. **Install dependencies:**

    ```sh
    pip install -r requirements.txt
    ```

### Frontend Setup

1. **Navigate to the frontend directory:**

    ```sh
    cd frontend
    ```

2. **Install dependencies:**

    ```sh
    npm install
    ```

## Usage

1. **Run the backend server:**
    - Make sure you are in the `backend` directory with the virtual environment activated.
    - Run the Flask application (assuming your main file is `app.py`):

    ```sh
    flask run
    ```

    - The backend will typically start on `http://127.0.0.1:5000`.

2. **Run the frontend development server:**
    - In a separate terminal, navigate to the `frontend` directory.
    - Run the development server:

    ```sh
    npm run dev
    ```

    - The frontend will start on `http://localhost:3000`.

3. **Open the application:**
    - Open your web browser and navigate to `http://localhost:3000`. You can now start chatting with the bot.
