
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PromptCategory } from "@/components/chat/types";
import { getIconComponent, getCategoryColor } from "@/utils/categoryUtils";

interface CategoryPrompt {
  en: string;
  es: string;
}

interface Category {
  id: string;
  name_en: string;
  name_es: string;
  icon: React.ReactNode;
  colorKey: string;
}

export const useCategoryPrompts = (edition: string = "hanuman") => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryPrompts, setCategoryPrompts] = useState<Record<string, CategoryPrompt[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('prompt_categories')
        .select('*')
        .eq('active', true);
      
      if (error) {
        console.error("Error fetching categories:", error);
        setError(new Error(`Error fetching categories: ${error.message}`));
        return;
      }
      
      if (data && data.length > 0) {
        // Transform database categories to match component structure
        const transformedCategories = data.map((category: PromptCategory) => {
          // Fetch prompts for this category
          fetchPromptsForCategory(category.id);
          
          return {
            id: category.id,
            name_en: category.name_en,
            name_es: category.name_es || category.name_en,
            icon: getIconComponent(category.icon),
            colorKey: getCategoryColor(category.id),
          };
        });
        
        setCategories(transformedCategories);
      }
    } catch (error) {
      console.error("Error in fetchCategories:", error);
      setError(error instanceof Error ? error : new Error('Unknown error fetching categories'));
    } finally {
      setIsLoading(false);
    }
  };
  
  const fetchPromptsForCategory = async (categoryId: string) => {
    try {
      const { data, error } = await supabase
        .from('localized_prompts')
        .select('*')
        .eq('category_id', categoryId)
        .eq('active', true)
        .eq('edition', edition);
      
      if (error) {
        console.error(`Error fetching prompts for category ${categoryId}:`, error);
        return;
      }
      
      if (data && data.length > 0) {
        // Create a formatted array of prompts for this category
        const formattedPrompts = data.map((prompt: any) => ({
          en: prompt.prompt_en,
          es: prompt.prompt_es || prompt.prompt_en
        }));
        
        // Update the categoryPrompts state
        setCategoryPrompts(prev => ({
          ...prev,
          [categoryId]: formattedPrompts
        }));
      }
    } catch (error) {
      console.error(`Error in fetchPromptsForCategory for ${categoryId}:`, error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [edition]);

  return {
    categories,
    categoryPrompts,
    isLoading,
    error
  };
};
