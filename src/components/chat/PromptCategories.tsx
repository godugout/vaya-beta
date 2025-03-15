
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  MessageSquare,
  AudioWaveform,
  BookOpen,
  Users,
  HeartHandshake,
  Lightbulb
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { PromptCategory } from "./types";
import { useLanguage } from "@/contexts/LanguageContext";

// Default categories with cultural context
const defaultCategories = [
  {
    id: "family_heritage",
    name_en: "Family Heritage",
    name_es: "Patrimonio Familiar",
    icon: <MessageSquare className="h-4 w-4" />,
    colorKey: "lovable-magenta",
    prompts: [
      {
        en: "Tell me about your family's roots and heritage.",
        es: "Cuéntame sobre las raíces y el patrimonio de tu familia."
      },
      {
        en: "What traditions have been passed down through generations in your family?",
        es: "¿Qué tradiciones se han transmitido a través de las generaciones en tu familia?"
      },
      {
        en: "Share a family recipe that has special meaning to you.",
        es: "Comparte una receta familiar que tenga un significado especial para ti."
      },
    ],
  },
  {
    id: "personal_connections",
    name_en: "Personal Connections",
    name_es: "Conexiones Personales",
    icon: <HeartHandshake className="h-4 w-4" />,
    colorKey: "lovable-yellow",
    prompts: [
      {
        en: "Who in your family has influenced you the most?",
        es: "¿Quién en tu familia te ha influenciado más?"
      },
      {
        en: "What family heirloom holds special meaning to you?",
        es: "¿Qué reliquia familiar tiene un significado especial para ti?"
      },
      {
        en: "What values did you learn from your family?",
        es: "¿Qué valores aprendiste de tu familia?"
      },
    ],
  },
  {
    id: "cultural_identity",
    name_en: "Cultural Identity",
    name_es: "Identidad Cultural",
    icon: <Users className="h-4 w-4" />,
    colorKey: "lovable-blue",
    prompts: [
      {
        en: "How do you celebrate your cultural heritage?",
        es: "¿Cómo celebras tu herencia cultural?"
      },
      {
        en: "What cultural practices or traditions are important in your family?",
        es: "¿Qué prácticas o tradiciones culturales son importantes en tu familia?"
      },
      {
        en: "How has your family's cultural identity evolved over generations?",
        es: "¿Cómo ha evolucionado la identidad cultural de tu familia a lo largo de las generaciones?"
      },
    ],
  },
  {
    id: "life_wisdom",
    name_en: "Life Wisdom",
    name_es: "Sabiduría de Vida",
    icon: <Lightbulb className="h-4 w-4" />,
    colorKey: "lovable-teal",
    prompts: [
      {
        en: "What's the most valuable lesson you've learned from a family elder?",
        es: "¿Cuál es la lección más valiosa que has aprendido de un anciano de la familia?"
      },
      {
        en: "Share a story about overcoming a challenge in your family.",
        es: "Comparte una historia sobre cómo superar un desafío en tu familia."
      },
      {
        en: "What wisdom would you most want to pass down to future generations?",
        es: "¿Qué sabiduría querrías transmitir a las generaciones futuras?"
      },
    ],
  },
];

interface PromptCategoriesProps {
  onPromptSelect: (prompt: string) => void;
  isSpanish?: boolean;
}

const PromptCategories = ({ onPromptSelect, isSpanish = false }: PromptCategoriesProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState(defaultCategories);
  const { isSpanish: appLanguageIsSpanish } = useLanguage();
  
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('prompt_categories')
        .select('*')
        .eq('active', true);
      
      if (error) {
        console.error("Error fetching categories:", error);
        return;
      }
      
      if (data && data.length > 0) {
        // Transform database categories to match component structure
        const transformedCategories = data.map((category: PromptCategory) => {
          const iconMap: Record<string, React.ReactNode> = {
            "message-square": <MessageSquare className="h-4 w-4" />,
            "audio-waveform": <AudioWaveform className="h-4 w-4" />,
            "book-open": <BookOpen className="h-4 w-4" />,
            "users": <Users className="h-4 w-4" />,
            "heart-handshake": <HeartHandshake className="h-4 w-4" />,
            "lightbulb": <Lightbulb className="h-4 w-4" />,
          };
          
          // Attempt to fetch prompts for this category
          fetchPromptsForCategory(category.id);
          
          return {
            id: category.id,
            name_en: category.name_en,
            name_es: category.name_es || category.name_en,
            icon: iconMap[category.icon] || <MessageSquare className="h-4 w-4" />,
            colorKey: getCategoryColor(category.id),
            prompts: [] // Will be populated later
          };
        });
        
        setCategories(transformedCategories);
      }
    } catch (error) {
      console.error("Error in fetchCategories:", error);
    }
  };
  
  const fetchPromptsForCategory = async (categoryId: string) => {
    try {
      const { data, error } = await supabase
        .from('localized_prompts')
        .select('*')
        .eq('category_id', categoryId)
        .eq('active', true);
      
      if (error) {
        console.error(`Error fetching prompts for category ${categoryId}:`, error);
        return;
      }
      
      if (data && data.length > 0) {
        setCategories(prevCategories => {
          return prevCategories.map(category => {
            if (category.id === categoryId) {
              return {
                ...category,
                prompts: data.map((prompt: any) => ({
                  en: prompt.prompt_en,
                  es: prompt.prompt_es || prompt.prompt_en
                }))
              };
            }
            return category;
          });
        });
      }
    } catch (error) {
      console.error(`Error in fetchPromptsForCategory for ${categoryId}:`, error);
    }
  };
  
  const getCategoryColor = (categoryId: string): string => {
    const colorMapping: Record<string, string> = {
      "family_heritage": "lovable-magenta",
      "personal_connections": "lovable-yellow",
      "cultural_identity": "lovable-blue",
      "life_wisdom": "lovable-teal",
    };
    
    return colorMapping[categoryId] || "lovable-magenta";
  };

  // Brand colors for categories
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

  const currentIsSpanish = isSpanish || appLanguageIsSpanish;

  return (
    <div className="space-y-4 p-4">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const colors = brandColors[category.colorKey as keyof typeof brandColors];
          return (
            <Popover key={category.id}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`flex items-center gap-2 transition-colors hover:bg-opacity-25 font-heading ${colors.bg} ${colors.text} ${colors.border} border ${
                    selectedCategory === category.id
                      ? "ring-2 ring-offset-2"
                      : ""
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.icon}
                  <span className="text-sm">{currentIsSpanish ? category.name_es : category.name_en}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent 
                className="w-80 p-2 bg-white shadow-lg rounded-xl"
                style={{ borderColor: colors.border }}
                sideOffset={5}
              >
                <div className="space-y-1.5">
                  {category.prompts.map((prompt, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className={`w-full justify-start text-left whitespace-normal h-auto py-3 hover:bg-opacity-10 text-sm ${colors.text} hover:${colors.bg}`}
                      onClick={() => {
                        onPromptSelect(currentIsSpanish ? prompt.es : prompt.en);
                      }}
                    >
                      <span className="line-clamp-2">
                        {currentIsSpanish ? prompt.es : prompt.en}
                      </span>
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          );
        })}
      </div>
    </div>
  );
};

export default PromptCategories;
