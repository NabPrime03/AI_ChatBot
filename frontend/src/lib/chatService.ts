import axios from 'axios';

// Create a pre-configured instance of axios specifically for our chat service.
const apiClient = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

interface BotResponse {
  response: string;
}

export const chatResponse = async (userMessage: string): Promise<string> => {
  try {
    // Use the pre-configured client to make the request.
    const response = await apiClient.post<BotResponse>('/api/chat', { 
      message: userMessage 
    });
    console.log("Response from backend:", response.data);
    
    // The response data is directly available on the `data` property.
    return response.data.response;

  } catch (error) {
    console.error('Error in chatService:', error);
    // Re-throw a generic error to be handled by the UI.
    throw new Error("Failed to communicate with the chatbot agent.");
  }
};
