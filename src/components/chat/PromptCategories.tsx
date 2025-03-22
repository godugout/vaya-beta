
import React from 'react';
import { promptCategories } from '@/data/hanumanPrompts';
import { useLanguage } from '@/contexts/LanguageContext';
import { Badge } from '@/components/ui/badge';
import { PromptCategory } from '@/components/chat/hooks/types';

interface PromptCategoriesProps {
  onSelectCategory: (categoryId: string) => void;
  selectedCategory: string;
}

const PromptCategories: React.FC<PromptCategoriesProps> = ({
  onSelectCategory,
  selectedCategory,
}) => {
  const { language } = useLanguage();
  const isSpanish = language === 'es';

  // Add an "All" category at the beginning
  const allCategories: PromptCategory[] = [
    {
      id: 'all',
      name: { en: 'All Topics', es: 'Todos los Temas' },
      icon: null,
      description: {
        en: 'View prompts from all categories',
        es: 'Ver temas de todas las categorías'
      }
    },
    ...promptCategories,
  ];

  return (
    <div className="prompt-categories mb-6">
      <h3 className="font-medium text-sm mb-2 text-muted-foreground">
        {isSpanish ? 'Categorías' : 'Categories'}
      </h3>
      <div className="flex flex-wrap gap-2">
        {allCategories.map((category) => (
          <Badge
            key={category.id}
            variant={category.id === selectedCategory ? 'default' : 'outline'}
            className="cursor-pointer py-1 px-3"
            onClick={() => onSelectCategory(category.id)}
          >
            {category.icon && <span className="mr-1">{category.icon}</span>}
            {isSpanish ? category.name.es : category.name.en}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default PromptCategories;
