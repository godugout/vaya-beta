
import { useState, useEffect } from 'react';
import { PromptCategory, PromptItem } from '@/components/chat/hooks/types';
import { hanumanPrompts } from '@/data/hanumanPrompts';

export const useCategoryPrompts = (isSpanish: boolean = false) => {
  const [categories, setCategories] = useState<PromptCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [allPrompts, setAllPrompts] = useState<PromptItem[]>([]);

  useEffect(() => {
    setCategories(hanumanPrompts);
    
    // Flatten all prompts from all categories
    const flattenedPrompts = hanumanPrompts.flatMap(category => 
      category.prompts.filter(prompt => prompt.isSpanish === isSpanish)
    );
    
    setAllPrompts(flattenedPrompts);
    setLoading(false);
  }, [isSpanish]);

  return {
    categories,
    allPrompts,
    loading,
  };
};

export default useCategoryPrompts;
