
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HanumanPromptItem } from "@/types/hanuman";
import { Sparkles } from "lucide-react";

export interface SuggestedPromptsProps {
  prompts?: HanumanPromptItem[];
  onSelect?: (prompt: string) => void;
  onPromptSelect?: (prompt: string) => void; // Keep for backward compatibility
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
  const defaultPrompts: HanumanPromptItem[] = [
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
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-5 w-5 text-amber-500" />
        <h3 className="text-lg font-medium">
          {isSpanish ? "Ideas para compartir" : "Sharing Ideas"}
        </h3>
      </div>
      
      <div className="grid gap-3">
        {promptsToShow.map((prompt) => (
          <Card 
            key={prompt.id} 
            className="hover:bg-muted/50 transition-colors cursor-pointer"
            onClick={() => handleSelect(prompt.content)}
          >
            <CardContent className="p-3">
              <div className="font-medium text-sm">{prompt.content}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {displayPrompts.length > 3 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded(!expanded)}
          className="w-full text-sm"
        >
          {expanded
            ? isSpanish ? "Mostrar menos" : "Show less"
            : isSpanish ? "Mostrar más" : "Show more"}
        </Button>
      )}
      
      <div className="pt-4 border-t mt-6">
        <h4 className="text-sm font-medium mb-2">
          {isSpanish ? "Categorías" : "Categories"}
        </h4>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            {isSpanish ? "Familia" : "Family"}
          </Button>
          <Button variant="outline" size="sm">
            {isSpanish ? "Tradiciones" : "Traditions"}
          </Button>
          <Button variant="outline" size="sm">
            {isSpanish ? "Celebraciones" : "Celebrations"}
          </Button>
          <Button variant="outline" size="sm">
            {isSpanish ? "Valores" : "Values"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuggestedPrompts;
