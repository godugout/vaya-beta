
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, Users, BookHeart, History, Flame, ChevronRight } from "lucide-react";
import { HanumanPromptItem } from "@/types/hanuman";
import { motion } from "framer-motion";

interface CategoryItem {
  id: string;
  icon: React.ReactNode;
  titleEn: string;
  titleEs: string;
  descriptionEn: string;
  descriptionEs: string;
}

interface HanumanCategoriesSidebarProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  suggestedPrompts: HanumanPromptItem[];
  onPromptSelect: (prompt: string) => void;
  isSpanish: boolean;
}

const HanumanCategoriesSidebar: React.FC<HanumanCategoriesSidebarProps> = ({
  activeCategory,
  setActiveCategory,
  suggestedPrompts,
  onPromptSelect,
  isSpanish
}) => {
  const categories: CategoryItem[] = [
    {
      id: "personal",
      icon: <Book className="h-5 w-5" />,
      titleEn: "Personal Stories",
      titleEs: "Historias Personales",
      descriptionEn: "Share your individual journey and experiences",
      descriptionEs: "Comparte tu viaje individual y experiencias"
    },
    {
      id: "family",
      icon: <Users className="h-5 w-5" />,
      titleEn: "Family Traditions",
      titleEs: "Tradiciones Familiares",
      descriptionEn: "Explore the customs that bind your family",
      descriptionEs: "Explora las costumbres que unen a tu familia"
    },
    {
      id: "wisdom",
      icon: <BookHeart className="h-5 w-5" />,
      titleEn: "Wisdom & Values",
      titleEs: "Sabiduría y Valores",
      descriptionEn: "Pass down the lessons and values you cherish",
      descriptionEs: "Transmite las lecciones y valores que aprecias"
    },
    {
      id: "history",
      icon: <History className="h-5 w-5" />,
      titleEn: "Historical Context",
      titleEs: "Contexto Histórico",
      descriptionEn: "Connect your family story with broader history",
      descriptionEs: "Conecta la historia de tu familia con la historia más amplia"
    },
    {
      id: "sacred",
      icon: <Flame className="h-5 w-5" />,
      titleEn: "Sacred Beliefs",
      titleEs: "Creencias Sagradas",
      descriptionEn: "Discuss faith, spirituality, and meaning",
      descriptionEs: "Discute la fe, la espiritualidad y el significado"
    }
  ];

  return (
    <div className="space-y-4">
      <Card className="hanuman-card">
        <CardHeader className="pb-2 border-b border-hanuman-gold/10">
          <CardTitle className="flex items-center text-hanuman-gold text-lg">
            <Flame className="h-5 w-5 mr-2 text-hanuman-orange" />
            {isSpanish ? "Categorías de Historias" : "Story Categories"}
          </CardTitle>
        </CardHeader>
        <CardContent className="py-3 px-3">
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-start gap-3 ${
                  activeCategory === category.id
                    ? "bg-hanuman-orange/15 text-hanuman-orange"
                    : "hover:bg-white/5 text-white/80 hover:text-white"
                }`}
              >
                <div className={`p-2 rounded-md ${
                  activeCategory === category.id
                    ? "bg-hanuman-orange/20"
                    : "bg-white/10"
                }`}>
                  {category.icon}
                </div>
                <div>
                  <div className="font-medium">
                    {isSpanish ? category.titleEs : category.titleEn}
                  </div>
                  <div className="text-xs opacity-80 mt-1">
                    {isSpanish ? category.descriptionEs : category.descriptionEn}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Suggested Prompts Card */}
      <Card className="hanuman-card">
        <CardHeader className="pb-2 border-b border-hanuman-gold/10">
          <CardTitle className="text-hanuman-gold text-lg">
            {isSpanish ? "Preguntas Sugeridas" : "Suggested Prompts"}
          </CardTitle>
        </CardHeader>
        <CardContent className="py-3 px-3">
          <div className="space-y-2">
            {suggestedPrompts.map((prompt) => (
              <motion.div
                key={prompt.id}
                whileHover={{ x: 5 }}
                className="cursor-pointer"
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left text-white/90 hover:text-white hover:bg-hanuman-orange/10"
                  onClick={() => onPromptSelect(prompt.content)}
                >
                  <ChevronRight className="h-4 w-4 mr-2 text-hanuman-orange" />
                  <span className="truncate">{prompt.content}</span>
                </Button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HanumanCategoriesSidebar;
