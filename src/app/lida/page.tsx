"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function LIDA() {
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    { text: "Hello! I'm LIDA, your power grid analysis assistant. How can I help you today?", isUser: false }
  ]);
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text: input, isUser: true }]);
    
    // Simulate AI response (replace with actual AI integration)
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "I'm analyzing your request about the power grid. This is a placeholder response that would normally come from the AI system.", 
        isUser: false 
      }]);
    }, 1000);

    setInput("");
  };

  return (
    <div className="container mx-auto h-[calc(100vh-4rem)] flex flex-col">
      <div className="p-6 bg-white shadow-sm">
        <h1 className="text-2xl font-bold">Analysis Point (LIDA)</h1>
        <p className="text-gray-600">Your intelligent power grid analysis assistant</p>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-sm p-4 rounded-lg ${
                  message.isUser
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 bg-white border-t">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about power grid analysis..."
            className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <Send size={20} />
            Send
          </button>
        </form>
      </div>
    </div>
  );
}