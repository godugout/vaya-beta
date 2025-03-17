
import { useState } from "react";
import { Message } from "../types";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePromptFetching } from "@/hooks/usePromptFetching";
import { useFamilyContextManagement } from "@/hooks/useFamilyContextManagement";
import { personalizePrompt } from "@/utils/promptPersonalization";

export const useMessages = (edition: string) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "¡Hola! I'm Narra, your storytelling companion. I'd love to help you capture and share your family's stories and traditions. What would you like to talk about today?",
    },
  ]);
  
  const { isSpanish } = useLanguage();
  const { prompts, getNextPrompt } = usePromptFetching(edition);
  const { familyContext } = useFamilyContextManagement();

  const handleSendMessage = (messageContent?: { content: string; attachments?: { type: "audio" | "image"; url: string }[] }, isSpanish: boolean = false) => {
    const content = messageContent?.content || "";
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
  };

  return {
    messages,
    setMessages,
    handleSendMessage,
  };
};
