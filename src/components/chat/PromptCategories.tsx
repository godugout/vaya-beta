import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  Home, 
  Baby, 
  BookOpen, 
  Calendar, 
  Trophy 
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface BrandGuideline {
  id: string;
  name: string;
  value: string;
  description: string;
}

const categories = [
  {
    name: "Family Traditions",
    icon: <Home className="h-4 w-4" />,
    colorKey: "Primary Purple",
    prompts: [
      "What special holiday traditions does your family celebrate?",
      "Tell me about a family recipe that has been passed down through generations.",
      "What unique customs or rituals make your family gatherings special?",
    ],
  },
  {
    name: "Childhood Memories",
    icon: <Baby className="h-4 w-4" />,
    colorKey: "Ocean Blue",
    prompts: [
      "What was your favorite childhood game or toy?",
      "Tell me about your most memorable family vacation as a child.",
      "What was your favorite place to play when you were young?",
      "Share a story about your best childhood friend.",
    ],
  },
  {
    name: "Life Lessons",
    icon: <BookOpen className="h-4 w-4" />,
    colorKey: "Bright Orange",
    prompts: [
      "What's the most important lesson your parents taught you?",
      "Share a mistake that taught you something valuable.",
      "What wisdom would you pass on to future generations?",
    ],
  },
  {
    name: "Historical Events",
    icon: <Calendar className="h-4 w-4" />,
    colorKey: "Primary Purple",
    prompts: [
      "What historical event had the biggest impact on your family?",
      "Tell me about how your family came to live where they do now.",
      "Share a story about how world events shaped your family's journey.",
      "What was happening in the world when you were growing up?",
    ],
  },
  {
    name: "Personal Achievements",
    icon: <Trophy className="h-4 w-4" />,
    colorKey: "Ocean Blue",
    prompts: [
      "What accomplishment are you most proud of?",
      "Tell me about a challenge you overcame.",
      "Share a moment when you surprised yourself with what you could do.",
      "What dream did you achieve that seemed impossible at first?",
    ],
  },
];

interface PromptCategoriesProps {
  onPromptSelect: (prompt: string) => void;
}

const PromptCategories = ({ onPromptSelect }: PromptCategoriesProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [brandColors, setBrandColors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchBrandGuidelines();
  }, []);

  const fetchBrandGuidelines = async () => {
    const { data: guidelines, error } = await supabase
      .from('brand_guidelines')
      .select('name, value')
      .eq('category', 'color');

    if (error) {
      console.error('Error fetching brand guidelines:', error);
      return;
    }

    const colors = guidelines.reduce((acc: Record<string, string>, guideline) => {
      acc[guideline.name] = guideline.value;
      return acc;
    }, {});

    setBrandColors(colors);
  };

  const getButtonStyle = (colorKey: string) => {
    const color = brandColors[colorKey] || '#9b87f5';
    return {
      backgroundColor: `${color}15`,
      color: color,
      borderColor: `${color}30`
    };
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Popover key={category.name}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`flex items-center gap-2 transition-colors hover:bg-opacity-25 ${
                  selectedCategory === category.name
                    ? "ring-2 ring-offset-2"
                    : ""
                }`}
                style={getButtonStyle(category.colorKey)}
                onClick={() => setSelectedCategory(category.name)}
              >
                {category.icon}
                {category.name}
              </Button>
            </PopoverTrigger>
            <PopoverContent 
              className="w-80 p-2 bg-white shadow-lg"
              style={{ borderColor: `${brandColors[category.colorKey]}30` }}
              sideOffset={5}
            >
              <div className="space-y-1.5">
                {category.prompts.map((prompt, index) => {
                  const color = brandColors[category.colorKey] || '#9b87f5';
                  return (
                    <Button
                      key={index}
                      variant="ghost"
                      className={`w-full justify-start text-left whitespace-normal h-auto py-3 hover:bg-opacity-10`}
                      style={{
                        color: brandColors[category.colorKey],
                      }}
                      onClick={() => {
                        onPromptSelect(prompt);
                      }}
                    >
                      <span className="line-clamp-2">{prompt}</span>
                    </Button>
                  );
                })}
              </div>
            </PopoverContent>
          </Popover>
        ))}
      </div>
    </div>
  );
};

export default PromptCategories;