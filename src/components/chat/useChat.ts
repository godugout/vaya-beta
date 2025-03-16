
import { useState } from "react";
import { Message } from "./types";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePromptFetching } from "@/hooks/usePromptFetching";
import { useFamilyContextManagement } from "@/hooks/useFamilyContextManagement";
import { personalizePrompt } from "@/utils/promptPersonalization";

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "¡Hola! I'm Narra, your storytelling companion. I'd love to help you capture and share your family's stories and traditions. What would you like to talk about today?",
    },
  ]);
  
  const [input, setInput] = useState("");
  const [edition, setEdition] = useState<string>("hanuman"); // Default to Hanuman edition
  const { isSpanish } = useLanguage();
  
  const { prompts, fetchPrompts, getNextPrompt } = usePromptFetching(edition);
  const { familyContext, saveFamilyContext } = useFamilyContextManagement();

  const handleSend = (messageContent?: { content: string; attachments?: { type: "audio" | "image"; url: string }[] }, isSpanish: boolean = false) => {
    const content = messageContent?.content || input;
    if (!content.trim()) return;

    const newMessage: Message = {
      role: "user",
      content,
      attachments: messageContent?.attachments,
    };

    setMessages((prev) => [...prev, newMessage]);

    const nextPrompt = getNextPrompt(isSpanish);
    
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: nextPrompt 
          ? `${personalizePrompt(nextPrompt.content, familyContext)}${nextPrompt.context ? ` (${nextPrompt.context})` : ""}`
          : isSpanish 
            ? "¡Qué interesante! ¿Te gustaría grabar esta historia? Puedo ayudarte con el proceso."
            : "That's interesting! Would you like to record this story? I can help guide you through the process.",
      },
    ]);
    
    setInput("");
  };

  const handleMorePrompts = (isSpanish: boolean = false) => {
    const nextPrompt = getNextPrompt(isSpanish);
    if (nextPrompt) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `${personalizePrompt(nextPrompt.content, familyContext)}${nextPrompt.context ? ` (${nextPrompt.context})` : ""}`,
        },
      ]);
    }
  };

  const setHanumanEdition = () => {
    setEdition("hanuman");
    fetchPrompts();
  };

  return {
    messages,
    input,
    setInput,
    handleSend,
    handleMorePrompts,
    familyContext,
    saveFamilyContext,
    edition,
    setHanumanEdition,
  };
};
