
import React from "react";
import { Button } from "@/components/ui/button";
import { PopoverTrigger } from "@/components/ui/popover";
import { LucideIcon } from "lucide-react";

export const getCategoryColorClasses = (colorKey: string = "default") => {
  const colorMap: Record<string, { text: string; bg: string; border: string }> = {
    default: {
      text: "text-blue-600 hover:text-blue-700",
      bg: "bg-blue-50 hover:bg-blue-100",
      border: "border-blue-200",
    },
    heritage: {
      text: "text-amber-600 hover:text-amber-700",
      bg: "bg-amber-50 hover:bg-amber-100",
      border: "border-amber-200",
    },
    personal: {
      text: "text-pink-600 hover:text-pink-700",
      bg: "bg-pink-50 hover:bg-pink-100",
      border: "border-pink-200",
    },
    generations: {
      text: "text-indigo-600 hover:text-indigo-700",
      bg: "bg-indigo-50 hover:bg-indigo-100",
      border: "border-indigo-200",
    },
    celebrations: {
      text: "text-emerald-600 hover:text-emerald-700",
      bg: "bg-emerald-50 hover:bg-emerald-100",
      border: "border-emerald-200",
    },
    characters: {
      text: "text-orange-600 hover:text-orange-700",
      bg: "bg-orange-50 hover:bg-orange-100",
      border: "border-orange-200",
    },
    history: {
      text: "text-gray-600 hover:text-gray-700",
      bg: "bg-gray-50 hover:bg-gray-100",
      border: "border-gray-200",
    },
    wisdom: {
      text: "text-purple-600 hover:text-purple-700",
      bg: "bg-purple-50 hover:bg-purple-100",
      border: "border-purple-200",
    },
    cultural: {
      text: "text-red-600 hover:text-red-700",
      bg: "bg-red-50 hover:bg-red-100",
      border: "border-red-200",
    },
    places: {
      text: "text-teal-600 hover:text-teal-700",
      bg: "bg-teal-50 hover:bg-teal-100",
      border: "border-teal-200",
    },
    relationships: {
      text: "text-cyan-600 hover:text-cyan-700",
      bg: "bg-cyan-50 hover:bg-cyan-100",
      border: "border-cyan-200",
    },
  };

  return colorMap[colorKey] || colorMap.default;
};

interface CategoryButtonProps {
  id: string;
  name: string;
  icon: React.ReactNode;
  colorKey: string;
  selectedCategory: string | null;
  onSelect: (id: string) => void;
}

const CategoryButton = ({
  id,
  name,
  icon,
  colorKey,
  selectedCategory,
  onSelect,
}: CategoryButtonProps) => {
  const colors = getCategoryColorClasses(colorKey);
  const isSelected = selectedCategory === id;

  return (
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        size="sm"
        className={`flex items-center gap-2 ${colors.text} ${
          isSelected ? colors.bg : "hover:" + colors.bg
        } border border-gray-200 hover:border-gray-300`}
        onClick={() => onSelect(id)}
      >
        {icon}
        <span className="text-sm font-medium">{name}</span>
      </Button>
    </PopoverTrigger>
  );
};

export default CategoryButton;
