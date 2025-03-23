
import { useState, FormEvent } from "react";
import { HanumanMessage, HanumanChatHook } from "@/types/hanuman";

export const useHanumanChat = (): HanumanChatHook => {
  const [messages, setMessages] = useState<HanumanMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isLoading) return;
    
    // Add user message
    const userMessage: HanumanMessage = {
      role: "user",
      content: input
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setInput("");
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse: HanumanMessage = {
        role: "assistant",
        content: getAIResponse(input)
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handlePromptSelect = (prompt: string) => {
    setInput(prompt);
  };

  const handleMorePrompts = () => {
    // This function would typically fetch more prompts from an API
    console.log("Fetch more prompts");
  };

  // Simple AI response simulation
  const getAIResponse = (userInput: string): string => {
    const responses = [
      "That's a fascinating perspective. Can you elaborate more on that?",
      "Your family history is valuable. What other memories would you like to share?",
      "I understand. That must have been a significant experience for you.",
      "Thank you for sharing that story. It will be preserved for future generations.",
      "What a wonderful tradition! How long has your family been practicing it?",
      "That's meaningful. How did this experience shape your values?",
      "I'd love to hear more about the context of when this happened.",
      "It's important to document these memories. Is there anything else you'd like to add?",
      "That's a beautiful memory. Who else was present during this event?",
      "I appreciate you sharing this. Would you like to explore more about this topic?"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return {
    messages,
    input,
    setInput,
    isLoading,
    handleSubmit,
    handlePromptSelect,
    handleMorePrompts
  };
};

export default useHanumanChat;
