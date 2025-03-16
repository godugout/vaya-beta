
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
  Lightbulb,
  Globe,
  Heart,
  Milestone,
  User,
  Home,
  Network,
  Image,
  Link,
  Landmark
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { PromptCategory } from "./types";
import { useLanguage } from "@/contexts/LanguageContext";

interface PromptCategoriesProps {
  onPromptSelect: (prompt: string) => void;
  isSpanish?: boolean;
  edition?: string;
}

const PromptCategories = ({ onPromptSelect, isSpanish = false, edition = "hanuman" }: PromptCategoriesProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [categoryPrompts, setCategoryPrompts] = useState<Record<string, {en: string, es: string}[]>>({});
  const { isSpanish: appLanguageIsSpanish } = useLanguage();
  
  useEffect(() => {
    fetchCategories();
  }, [edition]);

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
          const iconMap: Record<string, JSX.Element> = {
            "message-square": <MessageSquare className="h-4 w-4" />,
            "audio-waveform": <AudioWaveform className="h-4 w-4" />,
            "book-open": <BookOpen className="h-4 w-4" />,
            "users": <Users className="h-4 w-4" />,
            "heart-handshake": <HeartHandshake className="h-4 w-4" />,
            "lightbulb": <Lightbulb className="h-4 w-4" />,
            "globe": <Globe className="h-4 w-4" />,
            "heart": <Heart className="h-4 w-4" />,
            "milestone": <Milestone className="h-4 w-4" />,
            "user": <User className="h-4 w-4" />,
            "home": <Home className="h-4 w-4" />,
            "network": <Network className="h-4 w-4" />,
            "image": <Image className="h-4 w-4" />,
            "link": <Link className="h-4 w-4" />,
            "landmark": <Landmark className="h-4 w-4" />
          };
          
          // Fetch prompts for this category
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
        .eq('active', true)
        .eq('edition', edition);
      
      if (error) {
        console.error(`Error fetching prompts for category ${categoryId}:`, error);
        return;
      }
      
      if (data && data.length > 0) {
        // Create a formatted array of prompts for this category
        const formattedPrompts = data.map((prompt: any) => ({
          en: prompt.prompt_en,
          es: prompt.prompt_es || prompt.prompt_en
        }));
        
        // Update the categoryPrompts state
        setCategoryPrompts(prev => ({
          ...prev,
          [categoryId]: formattedPrompts
        }));
      }
    } catch (error) {
      console.error(`Error in fetchPromptsForCategory for ${categoryId}:`, error);
    }
  };
  
  const getCategoryColor = (categoryId: string): string => {
    // Map category IDs to color classes
    const colorMapping: Record<string, string> = {
      // Assign colors based on category types
      "family_heritage": "lovable-magenta",
      "personal_connections": "lovable-yellow",
      "cultural_identity": "lovable-blue",
      "life_milestones": "lovable-teal",
      "cultural_dimensions": "lovable-magenta",
      "intergenerational_bridges": "lovable-yellow",
      "family_wisdom": "lovable-teal",
      "historical_context": "lovable-blue",
      // If we have more categories than colors, we can recycle colors
    };
    
    // If we don't have a specific mapping, determine based on index in categories
    if (!colorMapping[categoryId]) {
      const availableColors = ["lovable-magenta", "lovable-yellow", "lovable-teal", "lovable-blue"];
      const index = Math.abs(categoryId.charCodeAt(0) + categoryId.charCodeAt(1)) % availableColors.length;
      return availableColors[index];
    }
    
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
          const categoryPromptsList = categoryPrompts[category.id] || [];
          
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
                  {categoryPromptsList.length > 0 ? (
                    categoryPromptsList.map((prompt, index) => (
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
                    ))
                  ) : (
                    <div className="p-3 text-sm text-gray-500 text-center">
                      Loading prompts...
                    </div>
                  )}
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
