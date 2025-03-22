
import { useState, useEffect } from "react";
import { hanumanPromptCategories, hanumanPrompts } from "@/data/hanumanPrompts";
import { PromptCategory, LocalizedPrompt } from "@/components/chat/types";
import { useFamilyContextManagement } from "./useFamilyContextManagement";
import { personalizePrompt } from "@/utils/promptPersonalization";

interface PromptItem {
  id: string;
  content: string;
  context?: string;
}

interface CategoryPromptsMap {
  [categoryId: string]: PromptItem[];
}

export function useCategoryPrompts(edition: string = "hanuman") {
  const [categories, setCategories] = useState<PromptCategory[]>([]);
  const [categoryPrompts, setCategoryPrompts] = useState<CategoryPromptsMap>({});
  const { familyContext } = useFamilyContextManagement();

  useEffect(() => {
    let promptData: LocalizedPrompt[] = [];
    let categoryData: PromptCategory[] = [];

    // Load data based on the edition
    if (edition === "hanuman") {
      promptData = hanumanPrompts;
      categoryData = hanumanPromptCategories;
    }

    setCategories(categoryData);
    
    // Group prompts by category and personalize them
    const groupedPrompts: CategoryPromptsMap = {};
    
    promptData.forEach(prompt => {
      if (!groupedPrompts[prompt.category_id]) {
        groupedPrompts[prompt.category_id] = [];
      }
      
      const promptEn = personalizePrompt(prompt.prompt_en, familyContext);
      const promptEs = personalizePrompt(prompt.prompt_es, familyContext);
      
      groupedPrompts[prompt.category_id].push({
        id: prompt.id,
        content: promptEn,
        context: prompt.cultural_context_en
      });
      
      // Store Spanish version with a modified ID
      if (prompt.prompt_es) {
        groupedPrompts[prompt.category_id].push({
          id: `${prompt.id}-es`,
          content: promptEs,
          context: prompt.cultural_context_es
        });
      }
    });
    
    setCategoryPrompts(groupedPrompts);
  }, [edition, familyContext]);

  // Get localized prompts for a specific category
  const getLocalizedPromptsForCategory = (categoryId: string, isSpanish: boolean = false): PromptItem[] => {
    const allPrompts = categoryPrompts[categoryId] || [];
    
    if (isSpanish) {
      return allPrompts.filter(p => p.id.endsWith('-es'));
    } else {
      return allPrompts.filter(p => !p.id.endsWith('-es'));
    }
  };

  // Get a random prompt from a specific category
  const getRandomPromptFromCategory = (categoryId: string, isSpanish: boolean = false): PromptItem | null => {
    const prompts = getLocalizedPromptsForCategory(categoryId, isSpanish);
    if (prompts.length === 0) return null;
    
    const randomIndex = Math.floor(Math.random() * prompts.length);
    return prompts[randomIndex];
  };

  return {
    categories,
    categoryPrompts,
    getLocalizedPromptsForCategory,
    getRandomPromptFromCategory
  };
}
