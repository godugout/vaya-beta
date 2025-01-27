import { useState, useEffect } from "react";
import { Message, StoryPrompt } from "./types";
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
  const [prompts, setPrompts] = useState<StoryPrompt[]>([]);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    fetchPrompts();
  }, []);

  const fetchPrompts = async () => {
    try {
      const { data, error } = await supabase
        .from("story_prompts")
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

  const getNextPrompt = () => {
    if (prompts.length === 0) return null;
    const prompt = prompts[currentPromptIndex];
    setCurrentPromptIndex((prev) => (prev + 1) % prompts.length);
    return prompt;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: input }]);

    const nextPrompt = getNextPrompt();
    
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: nextPrompt 
          ? `${nextPrompt.prompt}${nextPrompt.cultural_context ? ` (${nextPrompt.cultural_context})` : ""}`
          : "That's interesting! Would you like to record this story? I can help guide you through the process.",
      },
    ]);
    
    setInput("");
  };

  const handleMorePrompts = () => {
    const nextPrompt = getNextPrompt();
    if (nextPrompt) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `${nextPrompt.prompt}${nextPrompt.cultural_context ? ` (${nextPrompt.cultural_context})` : ""}`,
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