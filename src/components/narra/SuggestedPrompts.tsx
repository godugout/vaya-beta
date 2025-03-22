
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PromptItem } from "@/components/chat/hooks/types";
import { Sparkles } from "lucide-react";

export interface SuggestedPromptsProps {
  prompts?: PromptItem[];
  onSelect?: (prompt: string) => void;
  onPromptSelect?: (prompt: string) => void; // Add this prop to support both naming conventions
  isSpanish?: boolean;
}

const SuggestedPrompts = ({ 
  prompts = [], 
  onSelect, 
  onPromptSelect,
  isSpanish = false 
}: SuggestedPromptsProps) => {
  const [expanded, setExpanded] = useState(false);
  
  // Use a set of default prompts if none are provided
  const defaultPrompts = [
    { id: "1", content: isSpanish ? "Cuéntame sobre tu familia" : "Tell me about your family", category: "general" },
    { id: "2", content: isSpanish ? "¿Cuál es tu recuerdo favorito?" : "What is your favorite memory?", category: "general" },
    { id: "3", content: isSpanish ? "¿Cómo celebras las tradiciones familiares?" : "How do you celebrate family traditions?", category: "general" },
  ];
  
  const displayPrompts = prompts.length > 0 ? prompts : defaultPrompts;
  const promptsToShow = expanded ? displayPrompts : displayPrompts.slice(0, 3);
  
  // Support both onSelect and onPromptSelect callback naming
  const handleSelect = (prompt: string) => {
    if (onSelect) onSelect(prompt);
    if (onPromptSelect) onPromptSelect(prompt);
  };
  
  return (
    <Card className="bg-black/40 border-white/10 backdrop-blur-md">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-4 w-4 text-autumn" />
          <h3 className="text-sm font-medium text-white">
            {isSpanish ? "Sugerencias de Preguntas" : "Suggested Prompts"}
          </h3>
        </div>
        
        <div className="flex flex-col gap-2">
          {promptsToShow.map((prompt) => (
            <Button
              key={prompt.id}
              variant="ghost"
              size="sm"
              className="justify-start text-left text-white/80 hover:text-white hover:bg-white/10"
              onClick={() => handleSelect(prompt.content)}
            >
              {prompt.content}
            </Button>
          ))}
        </div>
        
        {displayPrompts.length > 3 && (
          <Button
            variant="link"
            className="mt-2 text-xs text-autumn"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded
              ? (isSpanish ? "Mostrar menos" : "Show less")
              : (isSpanish ? "Mostrar más" : "Show more")}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default SuggestedPrompts;
