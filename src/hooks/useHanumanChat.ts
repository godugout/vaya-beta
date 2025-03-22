
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFamilyContextManagement } from "@/hooks/useFamilyContextManagement";
import { usePromptManager } from "@/components/chat/hooks/usePromptManager";
import { Message } from "@/components/narra/types";

const initialMessages: Message[] = [
  {
    role: "assistant",
    content: "Hello! I'm here to help you capture and share your family stories. What would you like to talk about today?",
  },
];

export const useHanumanChat = () => {
  const { toast } = useToast();
  const { isSpanish } = useLanguage();
  const { familyContext } = useFamilyContextManagement();
  const { handleMorePrompts } = usePromptManager();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (inputText: string) => {
    if (!inputText.trim()) return;

    const userMessage: Message = { role: "user", content: inputText };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const assistantResponse: Message = {
        role: "assistant",
        content: `This is a simulated response to: ${inputText}. I am using the family context: ${JSON.stringify(
          familyContext
        )}`,
      };
      setMessages((prev) => [...prev, assistantResponse]);
    } catch (error: any) {
      toast({
        title: "Something went wrong.",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePromptSelect = (prompt: string) => {
    setInput(prompt);
  };

  return {
    messages,
    input,
    setInput,
    isLoading,
    handleSubmit,
    handlePromptSelect,
    handleMorePrompts: () => handleMorePrompts(setMessages, isSpanish),
  };
};
