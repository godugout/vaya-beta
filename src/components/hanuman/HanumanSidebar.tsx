
import React from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Flame, HomeIcon, Landmark, Book, Heart, History, Users, Calendar } from "lucide-react";
import { HanumanSidebarCategory } from "@/types/hanuman";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import SidebarCard from "./SidebarCard";

interface HanumanSidebarProps {
  activeCategory: string;
  onCategorySelect: (category: string) => void;
}

// Define sidebar categories
const sidebarCategories: HanumanSidebarCategory[] = [
  {
    id: "personal",
    name: "Personal Stories",
    description: "Share your individual journey and experiences",
    icon: HomeIcon
  },
  {
    id: "family",
    name: "Family Traditions",
    description: "Explore the customs that bind your family together",
    icon: Users
  },
  {
    id: "wisdom",
    name: "Wisdom & Values",
    description: "Pass down the lessons and values you've learned",
    icon: Book
  },
  {
    id: "history",
    name: "Historical Context",
    description: "Connect your family story with broader history",
    icon: History
  },
  {
    id: "sacred",
    name: "Sacred Beliefs",
    description: "Discuss faith, spirituality, and meaningful practices",
    icon: Landmark
  }
];

const HanumanSidebar: React.FC<HanumanSidebarProps> = ({ 
  activeCategory, 
  onCategorySelect 
}) => {
  const { isSpanish } = useLanguage();
  
  // Translate category name based on language
  const getTranslatedName = (categoryId: string): string => {
    switch (categoryId) {
      case "personal":
        return isSpanish ? "Historias Personales" : "Personal Stories";
      case "family":
        return isSpanish ? "Tradiciones Familiares" : "Family Traditions";
      case "wisdom":
        return isSpanish ? "Sabiduría y Valores" : "Wisdom & Values";
      case "history":
        return isSpanish ? "Contexto Histórico" : "Historical Context";
      case "sacred":
        return isSpanish ? "Creencias Sagradas" : "Sacred Beliefs";
      default:
        return categoryId;
    }
  };
  
  // Translate category description based on language
  const getTranslatedDescription = (categoryId: string): string => {
    switch (categoryId) {
      case "personal":
        return isSpanish ? "Comparte tu viaje y experiencias individuales" : "Share your individual journey and experiences";
      case "family":
        return isSpanish ? "Explora las costumbres que unen a tu familia" : "Explore the customs that bind your family together";
      case "wisdom":
        return isSpanish ? "Transmite las lecciones y valores que has aprendido" : "Pass down the lessons and values you've learned";
      case "history":
        return isSpanish ? "Conecta la historia de tu familia con la historia general" : "Connect your family story with broader history";
      case "sacred":
        return isSpanish ? "Discute la fe, la espiritualidad y las prácticas significativas" : "Discuss faith, spirituality, and meaningful practices";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-4">
      <SidebarCard 
        title={isSpanish ? "Categorías de Historia" : "Story Categories"}
        icon={<Flame className="h-5 w-5" />}
        defaultExpanded={true}
      >
        <div className="space-y-2">
          {sidebarCategories.map((category) => {
            const isActive = activeCategory === category.id;
            const CategoryIcon = category.icon;
            
            return (
              <motion.div
                key={category.id}
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start text-left p-2.5 h-auto ${
                    isActive 
                      ? "bg-hanuman-primary text-white" 
                      : "hover:bg-hanuman-primary/10"
                  }`}
                  onClick={() => onCategorySelect(category.id)}
                >
                  <div className="flex items-start gap-2">
                    <div className={`rounded-full p-1.5 ${
                      isActive 
                        ? "bg-white/20" 
                        : "bg-hanuman-primary/10"
                    }`}>
                      <CategoryIcon className={`h-3.5 w-3.5 ${
                        isActive ? "text-white" : "text-hanuman-primary"
                      }`} />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="font-medium text-sm">{getTranslatedName(category.id)}</span>
                      <span className="text-xs opacity-80 mt-0.5 line-clamp-2">{getTranslatedDescription(category.id)}</span>
                    </div>
                  </div>
                </Button>
              </motion.div>
            );
          })}
        </div>
      </SidebarCard>
      
      <SidebarCard 
        title={isSpanish ? "Próximos Eventos" : "Upcoming Events"}
        icon={<Calendar className="h-4 w-4" />}
      >
        <Card className="bg-hanuman-primary/5 border-hanuman-primary/20">
          <CardContent className="p-3">
            <div className="flex items-start gap-3">
              <div className="bg-hanuman-primary/10 rounded-full p-1.5">
                <Calendar className="h-3.5 w-3.5 text-hanuman-primary" />
              </div>
              <div>
                <h4 className="text-sm font-medium">{isSpanish ? "Festival de Cosecha" : "Harvest Festival"}</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{isSpanish ? "15 de Octubre" : "October 15"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </SidebarCard>
      
      <SidebarCard 
        title={isSpanish ? "Recursos" : "Resources"}
        icon={<Heart className="h-4 w-4" />}
      >
        <Card className="bg-gradient-to-br from-hanuman-primary/5 to-hanuman-accent/5 border-hanuman-primary/20">
          <CardContent className="p-3">
            <h4 className="text-sm font-medium mb-1 flex items-center gap-1">
              <Heart className="h-3 w-3 text-hanuman-primary" />
              <span>{isSpanish ? "Guía de Narración" : "Storytelling Guide"}</span>
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {isSpanish 
                ? "Aprende a compartir tus historias de manera efectiva" 
                : "Learn how to share your stories effectively"}
            </p>
          </CardContent>
        </Card>
      </SidebarCard>
    </div>
  );
};

export default HanumanSidebar;
