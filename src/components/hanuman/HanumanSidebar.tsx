
import React from "react";
import { BookOpen, FileText, Heart, History, Settings, Star, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

interface HanumanSidebarProps {
  onCategorySelect: (category: string) => void;
  activeCategory: string;
}

const HanumanSidebar: React.FC<HanumanSidebarProps> = ({ 
  onCategorySelect, 
  activeCategory 
}) => {
  const { isSpanish } = useLanguage();
  
  const categories = [
    { 
      id: "personal", 
      icon: Heart, 
      name: isSpanish ? "Personal" : "Personal", 
      description: isSpanish ? "Memorias personales" : "Personal memories"
    },
    { 
      id: "family", 
      icon: Users, 
      name: isSpanish ? "Familia" : "Family", 
      description: isSpanish ? "Tradiciones familiares" : "Family traditions"
    },
    { 
      id: "wisdom", 
      icon: BookOpen, 
      name: isSpanish ? "Sabiduría" : "Wisdom", 
      description: isSpanish ? "Lecciones aprendidas" : "Life lessons"
    },
    { 
      id: "history", 
      icon: History, 
      name: isSpanish ? "Historia" : "History", 
      description: isSpanish ? "Eventos históricos" : "Historical events"
    },
    { 
      id: "sacred", 
      icon: Star, 
      name: isSpanish ? "Sagrado" : "Sacred", 
      description: isSpanish ? "Tradiciones espirituales" : "Spiritual traditions"
    }
  ];

  return (
    <div className="side-column">
      <div className="side-column-header flex items-center gap-3">
        <Avatar className="h-8 w-8 border-2 border-hanuman-primary/20">
          <AvatarImage src="/assets/hanuman-avatar.png" alt="Hanuman" />
          <AvatarFallback className="bg-hanuman-primary text-white">H</AvatarFallback>
        </Avatar>
        <span>{isSpanish ? "Categorías" : "Categories"}</span>
      </div>
      
      <div className="side-column-body space-y-3">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onCategorySelect(category.id)}
            className={`p-3 rounded-lg cursor-pointer transition-colors ${
              activeCategory === category.id 
                ? "bg-hanuman-primary/10 border-l-4 border-hanuman-primary" 
                : "hover:bg-hanuman-primary/5"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${
                activeCategory === category.id 
                  ? "bg-hanuman-primary/20" 
                  : "bg-gray-100 dark:bg-gray-800"
              }`}>
                <category.icon size={18} 
                  className={activeCategory === category.id ? "text-hanuman-primary" : ""} 
                />
              </div>
              <div>
                <div className="font-medium text-sm">{category.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {category.description}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="side-column-footer">
        <div className="flex items-center justify-center gap-2 text-xs">
          <Settings size={14} />
          <span>{isSpanish ? "Ajustes de categoría" : "Category settings"}</span>
        </div>
      </div>
    </div>
  );
};

export default HanumanSidebar;
