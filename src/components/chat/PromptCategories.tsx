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
  BookOpen
} from "lucide-react";

const categories = [
  {
    name: "Tradiciones Familiares",
    name_es: "Tradiciones Familiares",
    icon: <MessageSquare className="h-4 w-4" />,
    colorKey: "Primary Orange",
    prompts: [
      {
        en: "What special holiday traditions does your family celebrate?",
        es: "¿Qué tradiciones festivas especiales celebra tu familia?"
      },
      {
        en: "Tell me about a family recipe that has been passed down through generations.",
        es: "Cuéntame sobre una receta familiar que ha pasado de generación en generación."
      },
      {
        en: "What unique customs make your family gatherings special?",
        es: "¿Qué costumbres únicas hacen especiales las reuniones de tu familia?"
      },
    ],
  },
  {
    name: "Historias de Vida",
    name_es: "Historias de Vida",
    icon: <AudioWaveform className="h-4 w-4" />,
    colorKey: "Ocean Blue",
    prompts: [
      {
        en: "What's the most important lesson your parents taught you?",
        es: "¿Cuál es la lección más importante que te enseñaron tus padres?"
      },
      {
        en: "Share a moment that changed your life's direction.",
        es: "Comparte un momento que cambió el rumbo de tu vida."
      },
      {
        en: "Tell me about a challenge you overcame that made you stronger.",
        es: "Cuéntame sobre un desafío que superaste y te hizo más fuerte."
      },
    ],
  },
  {
    name: "Herencia Cultural",
    name_es: "Herencia Cultural",
    icon: <BookOpen className="h-4 w-4" />,
    colorKey: "Nature Green",
    prompts: [
      {
        en: "What Costa Rican traditions do you maintain in your family?",
        es: "¿Qué tradiciones costarricenses mantienes en tu familia?"
      },
      {
        en: "Tell me about your favorite local celebration or festival.",
        es: "Cuéntame sobre tu celebración o festival local favorito."
      },
      {
        en: "Share a story about how your family came to live where they do now.",
        es: "Comparte una historia sobre cómo tu familia llegó a vivir donde está ahora."
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

  // Hardcoded colors that override any family brand colors
  const brandColors = {
    "Primary Orange": "#F97316",
    "Ocean Blue": "#0EA5E9",
    "Nature Green": "#84CC16"
  };

  const getButtonStyle = (colorKey: string) => {
    const color = brandColors[colorKey as keyof typeof brandColors];
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
                className={`flex items-center gap-2 transition-colors hover:bg-opacity-25 font-outfit ${
                  selectedCategory === category.name
                    ? "ring-2 ring-offset-2"
                    : ""
                }`}
                style={getButtonStyle(category.colorKey)}
                onClick={() => setSelectedCategory(category.name)}
              >
                {category.icon}
                {isSpanish ? category.name_es : category.name}
              </Button>
            </PopoverTrigger>
            <PopoverContent 
              className="w-80 p-2 bg-white shadow-lg"
              style={{ borderColor: `${brandColors[category.colorKey as keyof typeof brandColors]}30` }}
              sideOffset={5}
            >
              <div className="space-y-1.5">
                {category.prompts.map((prompt, index) => {
                  const color = brandColors[category.colorKey as keyof typeof brandColors];
                  return (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start text-left whitespace-normal h-auto py-3 hover:bg-opacity-10 font-inter"
                      style={{
                        color: color,
                      }}
                      onClick={() => {
                        onPromptSelect(isSpanish ? prompt.es : prompt.en);
                      }}
                    >
                      <span className="line-clamp-2">
                        {isSpanish ? prompt.es : prompt.en}
                      </span>
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