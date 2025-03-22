
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PromptCategory } from "./hooks/types";

export interface CategoryButtonProps {
  category: PromptCategory;
  isSelected: boolean;
  onSelect: (categoryId: string) => void;
  isSpanish?: boolean;
}

const CategoryButton = ({ category, isSelected, onSelect, isSpanish = false }: CategoryButtonProps) => {
  const displayName = isSpanish && category.nameEs ? category.nameEs : category.name;
  
  return (
    <Button
      variant={isSelected ? "secondary" : "outline"}
      size="sm"
      onClick={() => onSelect(category.id)}
      className={`gap-2 ${isSelected ? "bg-primary/20 text-primary border-primary/50" : ""}`}
    >
      {category.icon && <span className="text-muted-foreground">{category.icon}</span>}
      <span>{displayName}</span>
      <Badge variant="outline" className="ml-1 text-xs">
        {category.prompts ? category.prompts.filter(p => p.isSpanish === isSpanish).length : 0}
      </Badge>
    </Button>
  );
};

export default CategoryButton;
