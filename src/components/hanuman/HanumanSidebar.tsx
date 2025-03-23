
import React from "react";
import { Button } from "@/components/ui/button";
import { HanumanSidebarCategory } from "@/types/hanuman";

interface HanumanSidebarProps {
  categories: HanumanSidebarCategory[];
  activeCategory: string;
  onCategorySelect: (categoryId: string) => void;
}

const HanumanSidebar: React.FC<HanumanSidebarProps> = ({
  categories,
  activeCategory,
  onCategorySelect
}) => {
  return (
    <div className="hanuman-sidebar bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-hanuman-orange/20">
      <h3 className="text-lg font-semibold mb-4 text-hanuman-gold">Categories</h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant="ghost"
            className={`w-full justify-start ${
              activeCategory === category.id
                ? "bg-hanuman-orange/20 text-hanuman-gold"
                : "text-white/80 hover:bg-hanuman-orange/10 hover:text-white"
            }`}
            onClick={() => onCategorySelect(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default HanumanSidebar;
