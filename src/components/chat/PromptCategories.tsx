
import { useState } from "react";
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
    colorKey: "lovable-magenta",
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
    colorKey: "lovable-teal",
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
    colorKey: "lovable-purple",
    prompts: [
      {
        en: "What cultural traditions do you maintain in your family?",
        es: "¿Qué tradiciones culturales mantienes en tu familia?"
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

  // Brand colors for categories
  const brandColors = {
    "lovable-magenta": {
      bg: "bg-lovable-magenta/10",
      text: "text-lovable-magenta",
      border: "border-lovable-magenta/30"
    },
    "lovable-teal": {
      bg: "bg-lovable-teal/10",
      text: "text-lovable-teal",
      border: "border-lovable-teal/30"
    },
    "lovable-purple": {
      bg: "bg-lovable-purple/10",
      text: "text-lovable-purple",
      border: "border-lovable-purple/30"
    }
  };

  return (
    <div className="space-y-4 p-4">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const colors = brandColors[category.colorKey as keyof typeof brandColors];
          return (
            <Popover key={category.name}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`flex items-center gap-2 transition-colors hover:bg-opacity-25 font-heading ${colors.bg} ${colors.text} ${colors.border} border ${
                    selectedCategory === category.name
                      ? "ring-2 ring-offset-2"
                      : ""
                  }`}
                  onClick={() => setSelectedCategory(category.name)}
                >
                  {category.icon}
                  <span className="text-sm">{isSpanish ? category.name_es : category.name}</span>
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
                        onPromptSelect(isSpanish ? prompt.es : prompt.en);
                      }}
                    >
                      <span className="line-clamp-2">
                        {isSpanish ? prompt.es : prompt.en}
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
