'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X } from 'lucide-react';

const ChatComponent = () => {
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot' }[]>([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const sendSound = typeof Audio !== 'undefined' ? new Audio('/audio.mp3') : null;
  const receiveSound = typeof Audio !== 'undefined' ? new Audio('/audio.mp3') : null;

  // Load messages from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('chat_messages');
    if (stored) setMessages(JSON.parse(stored));
  }, []);

  // Save messages to localStorage on update
  useEffect(() => {
    localStorage.setItem('chat_messages', JSON.stringify(messages));
  }, [messages]);

  // Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const callWebhook = async (message: string) => {
    try {
      const response = await fetch('https://sahkishan.app.n8n.cloud/webhook/724f918c-2ab6-40fe-93cb-dfd121b5fe75/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatInput: message }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error calling webhook:', error);
      return null;
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { text: input, sender: 'user' as const };
    setMessages((prev) => [...prev, userMsg]);
    sendSound?.play();

    const response = await callWebhook(input);
    if (response?.output) {
      const botMsg = { text: response.output, sender: 'bot' as const };
      setMessages((prev) => [...prev, botMsg]);
      receiveSound?.play();
    } else {
      setMessages((prev) => [...prev, { text: 'Something went wrong.', sender: 'bot' }]);
    }

    setInput('');
  };

  return (
    <>
      <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 50 }}>
        {/* Chat toggle button */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg"
        >
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="w-[380px] h-[480px] mt-4 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="bg-blue-600 text-white p-3 font-semibold text-center">
                Chat with Us
              </div>

              <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50 custom-scrollbar">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`px-4 py-2 rounded-xl max-w-[75%] ${
                        msg.sender === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-gray-800'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef}></div>
              </div>

              <form onSubmit={handleSend} className="flex p-2 border-t border-gray-200">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border rounded-l-md outline-none"
                />
                <button type="submit" className="bg-blue-600 text-white px-4 rounded-r-md">
                  Send
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ChatComponent;
