"use client";

import React, { useState, FormEvent, useRef, useEffect } from 'react';
import { chatResponse } from '@/lib/chatService'; // Import the function to get bot responses

// Define the structure for a single message object
interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

export default function ChatPage() {
  // --- State Management using basic React hooks ---
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Ref for the message container to handle auto-scrolling
  const messageEndRef = useRef<HTMLDivElement>(null);

  // --- Side Effect for Auto-Scrolling ---
  // This runs after every time the 'messages' array changes
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // --- Form Submission Logic ---
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const userMessageText = inputValue.trim();
    if (!userMessageText) return;

    // Add the user's message to the UI immediately
    const userMessage: Message = { id: Date.now(), text: userMessageText, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Call the function to get the bot's response
      const botResponseText = await chatResponse(userMessageText);
      const botMessage: Message = { id: Date.now() + 1, text: botResponseText, sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Failed to get bot response:", error);
      const errorMessage: Message = { id: Date.now() + 1, text: "Sorry, something went wrong.", sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-col w-full h-screen bg-gray-900 text-white font-sans">
      <header className="p-4 border-b border-gray-700 w-full bg-gray-800/50 backdrop-blur-sm">
        <h1 className="text-xl font-bold text-center">My Chatbot</h1>
      </header>

      <section className="relative flex-grow w-full max-w-3xl mx-auto">
        <div className="absolute inset-0 pb-30 p-6 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex flex-col gap-4">
            {/* Dynamically render messages from the state array */}
            {messages.map((msg) => (
              <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'bot' && <span className="text-2xl">🤖</span>}
                <div className={`text-white rounded-2xl p-3 max-w-xs lg:max-w-md ${msg.sender === 'user' ? 'bg-blue-600 order-1' : 'bg-gray-700'}`}>
                  <p className="text-lg">{msg.text}</p>
                </div>
                {msg.sender === 'user' && <span className="text-2xl">👤</span>}
              </div>
            ))}
            
            {/* Show a loading indicator while waiting for the bot's response */}
            {isLoading && (
              <div className="flex justify-start items-end gap-2">
                <span className="text-2xl">🤖</span>
                <div className="bg-gray-700 rounded-2xl p-3">
                  <div className="flex items-center justify-center gap-1">
                    <span className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="h-2 w-2 bg-white rounded-full animate-bounce"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messageEndRef} />
          </div>
        </div>

        <footer className="absolute bottom-0 left-0 right-0 w-full p-4 border-t border-gray-700 bg-gray-900">
          <form className="flex items-start gap-4" onSubmit={handleSubmit}>
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              disabled={isLoading}
              className="flex-grow resize-none text-lg p-3 rounded-2xl bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Type your message..."
              aria-label="Chat input"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="self-end bg-blue-600 px-6 py-3 rounded-2xl font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors disabled:bg-gray-500"
              aria-label="Send message"
            >
              Send
            </button>
          </form>
        </footer>
      </section>
    </main>
  );
}
