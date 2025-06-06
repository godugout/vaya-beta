
import { useState, useEffect } from "react";
import { Message, LocalizedPrompt } from "./types";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";

// Mock prompts data
const mockPrompts: LocalizedPrompt[] = [
  {
    id: "1",
    category_id: "family",
    prompt_en: "Tell me about a family tradition that's special to you.",
    prompt_es: "Háblame de una tradición familiar que sea especial para ti.",
    cultural_context_en: "Family traditions help preserve cultural heritage.",
    cultural_context_es: "Las tradiciones familiares ayudan a preservar el patrimonio cultural.",
    active: true
  },
  {
    id: "2",
    category_id: "childhood",
    prompt_en: "What's your earliest childhood memory?",
    prompt_es: "¿Cuál es tu primer recuerdo de la infancia?",
    cultural_context_en: null,
    cultural_context_es: null,
    active: true
  }
];

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
  const [familyContext, setFamilyContext] = useState<any>(null);
  const { isSpanish } = useLanguage();
  const { toast } = useToast();

  useEffect(() => {
    fetchPrompts();
    loadFamilyContext();
  }, []);

  const loadFamilyContext = async () => {
    // Try to get from local storage first
    const localContext = localStorage.getItem('familyContextData');
    
    if (localContext) {
      setFamilyContext(JSON.parse(localContext));
      return;
    }
    
    // Then try to get from Supabase if user is logged in
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      const { data, error } = await supabase
        .from('user_family_context')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (error) {
        console.error("Error fetching family context:", error);
        return;
      }
      
      if (data) {
        setFamilyContext(data.context_data);
      }
    } catch (error) {
      console.error("Error in loadFamilyContext:", error);
    }
  };

  const fetchPrompts = async () => {
    try {
      // Try to fetch from Supabase
      const { data, error } = await supabase
        .from('localized_prompts')
        .select('*')
        .eq('active', true);
      
      if (error) {
        console.error("Error fetching prompts:", error);
        // Fall back to mock data
        setPrompts(mockPrompts);
        return;
      }
      
      if (data && data.length > 0) {
        setPrompts(data as LocalizedPrompt[]);
      } else {
        // Fall back to mock data if no prompts found
        setPrompts(mockPrompts);
      }
    } catch (error) {
      console.error("Error in fetchPrompts:", error);
      toast({
        title: "Error",
        description: "Failed to load story prompts",
        variant: "destructive",
      });
      // Fall back to mock data
      setPrompts(mockPrompts);
    }
  };

  const personalizePrompt = (promptText: string): string => {
    if (!familyContext) return promptText;
    
    let personalizedText = promptText;
    
    // Replace placeholders with actual context data
    if (familyContext.ancestralRegion) {
      personalizedText = personalizedText.replace(/\[user's heritage\]/g, familyContext.ancestralRegion);
      personalizedText = personalizedText.replace(/\[ancestral village\/city\]/g, familyContext.ancestralRegion);
    }
    
    if (familyContext.currentLocation) {
      personalizedText = personalizedText.replace(/\[current location\]/g, familyContext.currentLocation);
    }
    
    if (familyContext.culturalIdentity) {
      personalizedText = personalizedText.replace(/\[user's specific region in India\]/g, familyContext.culturalIdentity);
    }
    
    // Handle family members
    if (familyContext.familyElders && familyContext.familyElders.length > 0) {
      const randomElder = familyContext.familyElders[Math.floor(Math.random() * familyContext.familyElders.length)];
      personalizedText = personalizedText.replace(/\[family member\]/g, randomElder);
    }
    
    // Handle traditions
    if (familyContext.traditions && familyContext.traditions.length > 0) {
      const randomTradition = familyContext.traditions[Math.floor(Math.random() * familyContext.traditions.length)];
      personalizedText = personalizedText.replace(/\[tradition\]/g, randomTradition);
    }
    
    return personalizedText;
  };

  const getNextPrompt = (isSpanish: boolean = false) => {
    if (prompts.length === 0) return null;
    const prompt = prompts[currentPromptIndex];
    setCurrentPromptIndex((prev) => (prev + 1) % prompts.length);
    
    const promptContent = isSpanish ? prompt.prompt_es : prompt.prompt_en;
    const personalizedPrompt = personalizePrompt(promptContent);
    
    return {
      content: personalizedPrompt,
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
