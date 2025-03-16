
import { useState, useEffect } from "react";
import { Message, LocalizedPrompt } from "./types";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";

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
  const [edition, setEdition] = useState<string>("hanuman"); // Default to Hanuman edition
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
        // Also save to localStorage for quicker access next time
        localStorage.setItem('familyContextData', JSON.stringify(data.context_data));
      }
    } catch (error) {
      console.error("Error in loadFamilyContext:", error);
    }
  };

  const fetchPrompts = async () => {
    try {
      // Fetch from Supabase with edition filter
      const { data, error } = await supabase
        .from('localized_prompts')
        .select('*, prompt_categories(name_en, name_es)')
        .eq('edition', edition)
        .eq('active', true);
      
      if (error) {
        console.error("Error fetching prompts:", error);
        toast({
          title: "Error",
          description: "Failed to load story prompts",
          variant: "destructive",
        });
        return;
      }
      
      if (data && data.length > 0) {
        // Transform the data to match our LocalizedPrompt type
        const formattedPrompts = data.map((item: any) => ({
          id: item.id,
          category_id: item.category_id,
          prompt_en: item.prompt_en,
          prompt_es: item.prompt_es || item.prompt_en,
          cultural_context_en: item.cultural_context_en,
          cultural_context_es: item.cultural_context_es,
          active: item.active,
          category_name_en: item.prompt_categories?.name_en,
          category_name_es: item.prompt_categories?.name_es
        }));
        
        setPrompts(formattedPrompts);
      } else {
        toast({
          title: "No prompts found",
          description: "No prompts available for the selected edition",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error in fetchPrompts:", error);
      toast({
        title: "Error",
        description: "Failed to load story prompts",
        variant: "destructive",
      });
    }
  };

  const saveFamilyContext = async (contextData: any) => {
    try {
      // Save to localStorage
      localStorage.setItem('familyContextData', JSON.stringify(contextData));
      setFamilyContext(contextData);
      
      // Save to Supabase if user is logged in
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      const { error } = await supabase
        .from('user_family_context')
        .upsert({ 
          user_id: user.id, 
          context_data: contextData,
          updated_at: new Date().toISOString()
        }, { 
          onConflict: 'user_id' 
        });
      
      if (error) {
        console.error("Error saving family context:", error);
        toast({
          title: "Error",
          description: "Failed to save your family context",
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Success",
        description: "Your family context has been saved",
        variant: "default",
      });
    } catch (error) {
      console.error("Error in saveFamilyContext:", error);
      toast({
        title: "Error",
        description: "Failed to save your family context",
        variant: "destructive",
      });
    }
  };

  const personalizePrompt = (promptText: string): string => {
    if (!familyContext) return promptText;
    
    let personalizedText = promptText;
    
    // Replace placeholders with actual context data
    if (familyContext.ancestralRegion) {
      personalizedText = personalizedText.replace(/\[user's specific region in India\]/g, familyContext.ancestralRegion);
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
    
    // Handle hobbies/interests
    if (familyContext.hobbies && familyContext.hobbies.length > 0) {
      const randomHobby = familyContext.hobbies[Math.floor(Math.random() * familyContext.hobbies.length)];
      personalizedText = personalizedText.replace(/\[hobby\/interest\]/g, randomHobby);
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
      category: isSpanish ? prompt.category_name_es : prompt.category_name_en
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
