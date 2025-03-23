
import { useState, FormEvent, useCallback } from "react";
import { HanumanMessage, HanumanChatHook } from "@/types/hanuman";
import { useFamilyContextManagement } from "@/hooks/useFamilyContextManagement";

export const useHanumanChat = (): HanumanChatHook => {
  const [messages, setMessages] = useState<HanumanMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { familyContext } = useFamilyContextManagement();

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
        content: getAIResponse(input, familyContext)
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

  // Enhanced AI response simulation with family context awareness
  const getAIResponse = (userInput: string, context: any): string => {
    // Base responses
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
    
    // Personalized responses based on family context if available
    if (context) {
      // Check if the input contains any family elder names
      if (context.familyElders && context.familyElders.length > 0) {
        for (const elder of context.familyElders) {
          if (userInput.toLowerCase().includes(elder.toLowerCase())) {
            return `Thank you for sharing about ${elder}. Family elders hold so much wisdom. What's a special memory you have with them?`;
          }
        }
      }
      
      // Check if input contains any family traditions
      if (context.traditions && context.traditions.length > 0) {
        for (const tradition of context.traditions) {
          if (userInput.toLowerCase().includes(tradition.toLowerCase())) {
            return `${tradition} sounds like a meaningful tradition. How has it evolved over the years in your family?`;
          }
        }
      }
      
      // Cultural identity-specific response
      if (context.culturalIdentity && userInput.toLowerCase().includes(context.culturalIdentity.toLowerCase())) {
        return `Your ${context.culturalIdentity} heritage is rich with history. What aspects of this cultural identity are most important to you and your family?`;
      }
    }
    
    // Default to random response if no personalization matches
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
