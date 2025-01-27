import { useState, useEffect } from "react";
import { Message, LocalizedPrompt } from "./types";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "¡Hola! I'm Narra, your storytelling companion. I'd love to help you capture and share your family's stories and traditions. What would you like to talk about today?",
    },
  ]);
  
  const [input, setInput] = useState("");
  const [prompts, setPrompts] = useState<LocalizedPrompt[]>([]);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    fetchPrompts();
  }, []);

  const fetchPrompts = async () => {
    try {
      const { data, error } = await supabase
        .from("localized_prompts")
        .select("*")
        .eq("active", true);

      if (error) throw error;
      setPrompts(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load story prompts",
        variant: "destructive",
      });
    }
  };

  const getNextPrompt = (isSpanish: boolean = false) => {
    if (prompts.length === 0) return null;
    const prompt = prompts[currentPromptIndex];
    setCurrentPromptIndex((prev) => (prev + 1) % prompts.length);
    return {
      content: isSpanish ? prompt.prompt_es : prompt.prompt_en,
      context: isSpanish ? prompt.cultural_context_es : prompt.cultural_context_en,
    };
  };

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
          ? `${nextPrompt.content}${nextPrompt.context ? ` (${nextPrompt.context})` : ""}`
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
          content: `${nextPrompt.content}${nextPrompt.context ? ` (${nextPrompt.context})` : ""}`,
        },
      ]);
    }
  };

  return {
    messages,
    input,
    setInput,
    handleSend,
    handleMorePrompts,
  };
};