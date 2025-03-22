
import { useState } from "react";
import CategoryButton from "./CategoryButton";
import PromptList from "./PromptList";
import { PromptCategory, PromptCategoriesProps } from "./hooks/types";
import { hanumanPrompts } from "@/data/hanumanPrompts";

export const PromptCategories = ({ onPromptSelect, isSpanish, edition = "hanuman" }: PromptCategoriesProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Filter categories based on edition if needed
  const categories = hanumanPrompts;
  
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
  };
  
  const selectedCategoryData = selectedCategory
    ? categories.find((cat) => cat.id === selectedCategory)
    : null;
    
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <CategoryButton
            key={category.id}
            category={category}
            isSelected={category.id === selectedCategory}
            onSelect={handleCategorySelect}
            isSpanish={isSpanish}
          />
        ))}
      </div>
      
      {selectedCategoryData && (
        <PromptList
          prompts={selectedCategoryData.prompts.filter(p => p.isSpanish === isSpanish)}
          onSelect={onPromptSelect}
        />
      )}
    </div>
  );
};

export default PromptCategories;
