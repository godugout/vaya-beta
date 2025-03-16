
import { useState, useEffect } from "react";
import { LocalizedPrompt } from "@/components/chat/types";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const usePromptFetching = (edition: string = "hanuman") => {
  const [prompts, setPrompts] = useState<LocalizedPrompt[]>([]);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const { toast } = useToast();

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

  const getNextPrompt = (isSpanish: boolean = false) => {
    if (prompts.length === 0) return null;
    const prompt = prompts[currentPromptIndex];
    setCurrentPromptIndex((prev) => (prev + 1) % prompts.length);
    
    const promptContent = isSpanish ? prompt.prompt_es : prompt.prompt_en;
    
    return {
      content: promptContent,
      context: isSpanish ? prompt.cultural_context_es : prompt.cultural_context_en,
      category: isSpanish ? prompt.category_name_es : prompt.category_name_en
    };
  };

  useEffect(() => {
    fetchPrompts();
  }, [edition]);

  return {
    prompts,
    fetchPrompts,
    getNextPrompt
  };
};
