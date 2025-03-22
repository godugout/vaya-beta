
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { NarraStoryPrompt } from "./NarraStoryPrompt";
import { Pin, History, MessagesSquare, FileText, Bookmark, Globe, Users, Heart, Star, Quote } from "lucide-react";
import { useEffect, useState } from "react";
import { hanumanPromptCategories, hanumanPrompts } from "@/data/hanumanPrompts";
import { personalizePrompt } from "@/utils/promptPersonalization";
import { useFamilyContextManagement } from "@/hooks/useFamilyContextManagement";

interface SuggestedPromptsProps {
  isSpanish: boolean;
  onPromptSelect: (prompt: string) => void;
}

export const SuggestedPrompts = ({ isSpanish, onPromptSelect }: SuggestedPromptsProps) => {
  const { familyContext } = useFamilyContextManagement();
  const [localizedPrompts, setLocalizedPrompts] = useState<{[key: string]: string[]}>({});
  
  // Initialize prompt categories based on the Hanuman prompt categories
  const promptCategories = hanumanPromptCategories.slice(0, 4).map(category => ({
    id: category.id,
    titleEn: category.name_en,
    titleEs: category.name_es,
    descriptionEn: category.description_en,
    descriptionEs: category.description_es,
    icon: category.icon
  }));

  useEffect(() => {
    // Group and personalize prompts by category
    const groupedPrompts: {[key: string]: string[]} = {};
    
    hanumanPromptCategories.forEach(category => {
      const categoryPrompts = hanumanPrompts
        .filter(prompt => prompt.category_id === category.id)
        .slice(0, 3) // Limit to 3 prompts per category
        .map(prompt => {
          const promptText = isSpanish ? prompt.prompt_es : prompt.prompt_en;
          return personalizePrompt(promptText, familyContext);
        });
        
      groupedPrompts[category.id] = categoryPrompts;
    });
    
    setLocalizedPrompts(groupedPrompts);
  }, [isSpanish, familyContext]);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {promptCategories.map((category) => (
          <Card key={category.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                {category.icon}
                {isSpanish ? category.titleEs : category.titleEn}
              </CardTitle>
              <CardDescription>
                {isSpanish ? category.descriptionEs : category.descriptionEn}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {localizedPrompts[category.id]?.map((promptText, i) => (
                  <NarraStoryPrompt
                    key={`${category.id}-${i}`}
                    prompt={promptText}
                    onClick={onPromptSelect}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
