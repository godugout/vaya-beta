
import { useState, useEffect } from "react";
import { PromptItem } from "@/components/chat/hooks/types";
import { allPrompts, promptCategories } from "@/data/hanumanPrompts";

export const useCategoryPrompts = (categoryId: string = "all") => {
  const [prompts, setPrompts] = useState<PromptItem[]>([]);

  useEffect(() => {
    if (categoryId === "all") {
      setPrompts(allPrompts);
    } else {
      const filteredPrompts = allPrompts.filter(
        (prompt) => prompt.category === categoryId
      );
      setPrompts(filteredPrompts);
    }
  }, [categoryId]);

  const getCategoryName = (categoryId: string, language: 'en' | 'es' = 'en') => {
    const category = promptCategories.find(cat => cat.id === categoryId);
    return category ? category.name[language] : categoryId;
  };

  return { prompts, getCategoryName };
};
