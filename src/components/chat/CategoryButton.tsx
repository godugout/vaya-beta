
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { PopoverTrigger } from "@/components/ui/popover";

interface CategoryButtonProps {
  id: string;
  name: string;
  icon: ReactNode;
  colorKey: string;
  selectedCategory: string | null;
  onSelect: (id: string) => void;
}

export const getCategoryColorClasses = (colorKey: string) => {
  const brandColors = {
    "lovable-magenta": {
      bg: "bg-lovable-magenta/10",
      text: "text-lovable-magenta",
      border: "border-lovable-magenta/30"
    },
    "lovable-yellow": {
      bg: "bg-amber-500/10",
      text: "text-amber-500", 
      border: "border-amber-500/30"
    },
    "lovable-teal": {
      bg: "bg-lovable-teal/10",
      text: "text-lovable-teal",
      border: "border-lovable-teal/30"
    },
    "lovable-blue": {
      bg: "bg-lovable-blue/10",
      text: "text-lovable-blue",
      border: "border-lovable-blue/30"
    }
  };
  
  return brandColors[colorKey as keyof typeof brandColors] || brandColors["lovable-magenta"];
};

const CategoryButton = ({ id, name, icon, colorKey, selectedCategory, onSelect }: CategoryButtonProps) => {
  const colors = getCategoryColorClasses(colorKey);
  
  return (
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        className={`flex items-center gap-2 transition-colors hover:bg-opacity-25 font-heading ${colors.bg} ${colors.text} ${colors.border} border ${
          selectedCategory === id ? "ring-2 ring-offset-2" : ""
        }`}
        onClick={() => onSelect(id)}
      >
        {icon}
        <span className="text-sm">{name}</span>
      </Button>
    </PopoverTrigger>
  );
};

export default CategoryButton;
