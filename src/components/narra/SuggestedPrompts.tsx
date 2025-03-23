
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HanumanPromptItem } from "@/types/hanuman";
import { Sparkles } from "lucide-react";
import SidebarCard from "@/components/hanuman/SidebarCard";

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
    { id: "1", content: isSpanish ? "Cuéntame sobre tu familia" : "Tell me about your family", category: "personal" },
    { id: "2", content: isSpanish ? "¿Cuál es tu recuerdo favorito?" : "What is your favorite memory?", category: "personal" },
    { id: "3", content: isSpanish ? "¿Cómo celebras las tradiciones familiares?" : "How do you celebrate family traditions?", category: "family" },
  ];
  
  const displayPrompts = prompts.length > 0 ? prompts : defaultPrompts;
  const promptsToShow = expanded ? displayPrompts : displayPrompts.slice(0, 3);
  
  // Support both onSelect and onPromptSelect callback naming
  const handleSelect = (prompt: string) => {
    if (onSelect) onSelect(prompt);
    if (onPromptSelect) onPromptSelect(prompt);
  };
  
  return (
    <SidebarCard 
      title={isSpanish ? "Ideas para compartir" : "Conversation Starters"}
      icon={<Sparkles className="h-4 w-4 text-amber-500" />}
      defaultExpanded={true}
    >
      <div className="grid gap-2">
        {promptsToShow.map((prompt) => (
          <Card 
            key={prompt.id} 
            className="hover:bg-muted/50 transition-colors cursor-pointer border-hanuman-primary/10 hover:border-hanuman-primary/30 hanuman-glow"
            onClick={() => handleSelect(prompt.content)}
          >
            <CardContent className="p-2.5">
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
          className="w-full text-xs mt-2 hover:text-hanuman-primary hover:bg-hanuman-primary/5"
        >
          {expanded
            ? isSpanish ? "Mostrar menos" : "Show less"
            : isSpanish ? "Mostrar más" : "Show more"}
        </Button>
      )}
      
      <div className="pt-3 border-t mt-4 border-gray-200 dark:border-gray-700/20">
        <h4 className="text-xs font-medium mb-2 text-hanuman-text-secondary">
          {isSpanish ? "Categorías" : "Categories"}
        </h4>
        <div className="flex flex-wrap gap-1.5">
          <Button variant="outline" size="sm" className="text-xs py-1 h-auto bg-hanuman-bg-dark/40 border-hanuman-gold/20 text-hanuman-gold/90 hover:bg-hanuman-gold/10">
            {isSpanish ? "Familia" : "Family"}
          </Button>
          <Button variant="outline" size="sm" className="text-xs py-1 h-auto bg-hanuman-bg-dark/40 border-hanuman-orange/20 text-hanuman-orange/90 hover:bg-hanuman-orange/10">
            {isSpanish ? "Tradiciones" : "Traditions"}
          </Button>
          <Button variant="outline" size="sm" className="text-xs py-1 h-auto bg-hanuman-bg-dark/40 border-hanuman-cosmic-blue/20 text-hanuman-text-secondary hover:bg-hanuman-cosmic-blue/10">
            {isSpanish ? "Historia" : "History"}
          </Button>
          <Button variant="outline" size="sm" className="text-xs py-1 h-auto bg-hanuman-bg-dark/40 border-hanuman-green/20 text-hanuman-green/90 hover:bg-hanuman-green/10">
            {isSpanish ? "Valores" : "Values"}
          </Button>
        </div>
      </div>
    </SidebarCard>
  );
};

export default SuggestedPrompts;
