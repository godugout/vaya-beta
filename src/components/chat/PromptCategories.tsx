
import { useState } from "react";
import {
  Popover,
  PopoverContent,
} from "@/components/ui/popover";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCategoryPrompts } from "@/hooks/useCategoryPrompts";
import CategoryButton from "./CategoryButton";
import PromptList from "./PromptList";
import { getCategoryColorClasses } from "./CategoryButton";

interface PromptCategoriesProps {
  onPromptSelect: (prompt: string) => void;
  isSpanish?: boolean;
  edition?: string;
}

const PromptCategories = ({ onPromptSelect, isSpanish = false, edition = "hanuman" }: PromptCategoriesProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { categories, categoryPrompts } = useCategoryPrompts(edition);
  const { isSpanish: appLanguageIsSpanish } = useLanguage();
  
  const currentIsSpanish = isSpanish || appLanguageIsSpanish;

  return (
    <div className="space-y-4 p-4">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const colors = getCategoryColorClasses(category.colorKey);
          const categoryPromptsList = categoryPrompts[category.id] || [];
          
          return (
            <Popover key={category.id}>
              <CategoryButton
                id={category.id}
                name={currentIsSpanish ? category.name_es : category.name_en}
                icon={category.icon}
                colorKey={category.colorKey}
                selectedCategory={selectedCategory}
                onSelect={setSelectedCategory}
              />
              <PopoverContent 
                className="w-80 p-2 bg-white shadow-lg rounded-xl"
                style={{ borderColor: colors.border }}
                sideOffset={5}
              >
                <PromptList
                  prompts={categoryPromptsList}
                  isSpanish={currentIsSpanish}
                  colorClasses={colors}
                  onPromptSelect={onPromptSelect}
                />
              </PopoverContent>
            </Popover>
          );
        })}
      </div>
    </div>
  );
};

export default PromptCategories;
