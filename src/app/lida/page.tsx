"use client";

import { useState } from "react";
import { Send, Target } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import React from "react";

export default function LIDA() {
  const [messages, setMessages] = useState<
    Array<{ text: string; isUser: boolean }>
  >([
    {
      text: "Hello! I'm LIDA, your power grid analysis assistant. How can I help you today?",
      isUser: false,
    },
  ]);
  const [input, setInput] = useState("");
  const goals = [
    "Identify peak load times and patterns.",
    "Detect anomalies in power consumption.",
    "Optimize energy distribution.",
    "Analyze the impact of renewable energy sources.",
    "Predict future energy needs.",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text: input, isUser: true }]);

    // Simulate AI response (replace with actual AI integration)
    setTimeout( () => {
      setMessages((prev) => [
        ...prev,
        {
          text: "I'm analyzing your request about the power grid. This is a placeholder response that would normally come from the AI system.",
          isUser: false,
        },
      ]);
    }, 1000);

    setInput("");
  };

  return (
    <Tabs
      defaultValue="goals"
      className="container mx-auto h-[calc(100vh-4rem)] flex flex-col"
    >
      <TabsList className="w-full justify-center mt-4 space-x-4">
        <TabsTrigger
          value="goals"
          className="w-48 h-12 font-bold text-lg data-[state=active]:bg-blue-500 data-[state=active]:text-white"
        >
          <div className="flex items-center">
            <Target className="mr-2 h-4 w-4" />
            Goals
          </div>
        </TabsTrigger>
        <TabsTrigger
          value="visualization"
          className="w-48 h-12 font-bold text-lg data-[state=active]:bg-blue-500 data-[state=active]:text-white"
        >
          Visualization Playground
        </TabsTrigger>
      </TabsList>

      <TabsContent
        value="goals"
        className="p-6 flex-1 overflow-y-auto bg-zinc-900 text-white"
      >
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            <div className="flex items-center">
              <Target className="mr-2 h-4 w-4" />
              Goals from LIDA LLM about the dataset:
            </div>
          </h2>
          <ul className="list-disc list-inside space-y-2">
            {goals.map((goal, index) => (
              <li key={index} className="text-gray-800">
                {goal}
              </li>
            ))}
          </ul>
        </div>
      </TabsContent>
      <TabsContent value="visualization" className="relative flex-1 flex flex-col overflow-hidden bg-zinc-900">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <h1 className="text-8xl font-bold text-gray-700 opacity-30">
              Playground
            </h1>
          </div>
           <div className="p-6 shadow-sm relative z-10 ">
           <h1 className="text-2xl font-bold text-white">Analysis Point (LIDA)</h1>
            <p className="text-gray-400">
              Your intelligent power grid analysis assistant
            </p>

        </div>
        <div className="flex-1 p-6 overflow-y-auto relative z-10">
          <div className="max-w-3xl mx-auto space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                onContextMenu={(e) => {
                  e.preventDefault();
                  // Handle right-click event, e.g., show a context menu
                  console.log("Right-click on message:", message.text);
                }}
                
                className={`flex ${
                  message.isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-sm p-4 rounded-lg ${
                    message.isUser
                      ? "bg-blue-500 text-white"
                      : "bg-gray-700 text-gray-300"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            )) }
          </div>
        </div>
        <div className="p-6 bg-white border-t">
          <form
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto flex gap-4"
          >
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
      </TabsContent>

    </Tabs>
  );
}